import gremlin from "gremlin";
import type {
  GraphData, GraphNode, GraphLink,
  DeveloperSummary, DeveloperProfile, DeveloperNetwork,
  SkillRanking, SkillRecommendation,
} from "./types";

const DriverRemoteConnection = gremlin.driver.DriverRemoteConnection;
const traversal = gremlin.process.AnonymousTraversalSource.traversal;
const __ = gremlin.process.statics;
const order = gremlin.process.order;

function getConnection() {
  const key = "__gremlin_connection__" as keyof typeof globalThis;
  if (!(globalThis as Record<string, unknown>)[key]) {
    const url = process.env.GREMLIN_URL || "ws://localhost:8182/gremlin";
    (globalThis as Record<string, unknown>)[key] =
      new DriverRemoteConnection(url, {
        mimeType: "application/vnd.gremlin-v3.0+json",
      });
  }
  return (globalThis as Record<string, unknown>)[key] as InstanceType<
    typeof DriverRemoteConnection
  >;
}

function getG() {
  return traversal().withRemote(getConnection());
}

function flattenProps(propsMap: unknown): Record<string, string> {
  const flat: Record<string, string> = {};
  if (propsMap instanceof Map) {
    propsMap.forEach((val: unknown, key: string) => {
      flat[key] = Array.isArray(val) ? String(val[0]) : String(val);
    });
  }
  return flat;
}

// --- Full Graph (existing) ---

export async function getFullGraph(): Promise<GraphData> {
  const g = getG();

  const rawVertices = await g
    .V()
    .project("id", "label", "properties")
    .by(gremlin.process.t.id)
    .by(gremlin.process.t.label)
    .by(__.valueMap())
    .toList();

  const rawEdges = await g
    .E()
    .project("id", "label", "source", "target", "properties")
    .by(gremlin.process.t.id)
    .by(gremlin.process.t.label)
    .by(__.outV().id())
    .by(__.inV().id())
    .by(__.valueMap())
    .toList();

  const nodes: GraphNode[] = (rawVertices as Map<string, unknown>[]).map((v) => {
    const props = flattenProps(v.get("properties"));
    return {
      id: String(v.get("id")),
      label: String(v.get("label")),
      name: props.name || String(v.get("label")),
      properties: props,
    };
  });

  const links: GraphLink[] = (rawEdges as Map<string, unknown>[]).map((e) => {
    const props = flattenProps(e.get("properties"));
    return {
      source: String(e.get("source")),
      target: String(e.get("target")),
      label: String(e.get("label")),
      properties: props,
    };
  });

  return { nodes, links };
}

// --- Developers ---

export async function getDevelopers(): Promise<DeveloperSummary[]> {
  const g = getG();

  const raw = await g
    .V()
    .hasLabel("developer")
    .project("id", "name", "role", "seniority", "skills")
    .by(gremlin.process.t.id)
    .by("name")
    .by("role")
    .by("seniority")
    .by(__.out("knows").values("name").fold())
    .toList();

  return (raw as Map<string, unknown>[]).map((m) => ({
    id: String(m.get("id")),
    name: String(m.get("name")),
    role: String(m.get("role")),
    seniority: String(m.get("seniority")),
    skills: (m.get("skills") as string[]) || [],
  }));
}

// --- Developer by ID ---

export async function getDeveloperById(id: string): Promise<DeveloperProfile | null> {
  const g = getG();
  const numId = parseInt(id);

  const raw = await g
    .V(numId)
    .hasLabel("developer")
    .project("id", "name", "role", "seniority", "company", "skills", "projects", "collaborators")
    .by(gremlin.process.t.id)
    .by("name")
    .by("role")
    .by("seniority")
    .by(__.out("works_at").values("name").fold())
    .by(__.outE("knows").project("name", "level").by(__.inV().values("name")).by("level").fold())
    .by(__.out("worked_on").values("name").fold())
    .by(__.both("collaborates_with").project("id", "name", "role").by(gremlin.process.t.id).by("name").by("role").fold())
    .toList();

  if (raw.length === 0) return null;

  const m = raw[0] as Map<string, unknown>;
  const companyArr = m.get("company") as string[];
  const skillMaps = m.get("skills") as Map<string, string>[];
  const collabMaps = m.get("collaborators") as Map<string, unknown>[];

  return {
    id: String(m.get("id")),
    name: String(m.get("name")),
    role: String(m.get("role")),
    seniority: String(m.get("seniority")),
    company: companyArr.length > 0 ? companyArr[0] : null,
    skills: (skillMaps || []).map((s) => ({
      name: String(s.get("name")),
      level: String(s.get("level")),
    })),
    projects: (m.get("projects") as string[]) || [],
    collaborators: (collabMaps || []).map((c) => ({
      id: String(c.get("id")),
      name: String(c.get("name")),
      role: String(c.get("role")),
    })),
  };
}

// --- Developer Network ---

export async function getDeveloperNetwork(id: string): Promise<DeveloperNetwork | null> {
  const g = getG();
  const numId = parseInt(id);

  // Get developer name
  const devRaw = await g.V(numId).hasLabel("developer").values("name").toList();
  if (devRaw.length === 0) return null;
  const devName = String(devRaw[0]);

  // Get collaborators with their skills
  const collabRaw = await g
    .V(numId)
    .both("collaborates_with")
    .project("id", "name", "role", "skills")
    .by(gremlin.process.t.id)
    .by("name")
    .by("role")
    .by(__.out("knows").values("name").fold())
    .toList();

  const collaborators = (collabRaw as Map<string, unknown>[]).map((c) => ({
    id: String(c.get("id")),
    name: String(c.get("name")),
    role: String(c.get("role")),
    skills: (c.get("skills") as string[]) || [],
  }));

  // Collect all unique network skills
  const networkSkillsSet = new Set<string>();
  for (const c of collaborators) {
    for (const s of c.skills) networkSkillsSet.add(s);
  }

  return {
    developer: devName,
    collaborators,
    networkSkills: Array.from(networkSkillsSet),
  };
}

// --- Skills Ranked ---

export async function getSkillsRanked(): Promise<SkillRanking[]> {
  const g = getG();

  const raw = await g
    .V()
    .hasLabel("skill")
    .project("name", "category", "projectCount")
    .by("name")
    .by("category")
    .by(__.in_("uses").count())
    .order()
    .by("projectCount", order.desc)
    .toList();

  return (raw as Map<string, unknown>[]).map((m) => ({
    name: String(m.get("name")),
    category: String(m.get("category")),
    projectCount: Number(m.get("projectCount")),
  }));
}

// --- Skill Recommendations ---

export async function getSkillRecommendations(id: string): Promise<SkillRecommendation | null> {
  const g = getG();
  const numId = parseInt(id);

  // Get developer name + own skills
  const devRaw = await g
    .V(numId)
    .hasLabel("developer")
    .project("name", "skills")
    .by("name")
    .by(__.out("knows").values("name").fold())
    .toList();

  if (devRaw.length === 0) return null;

  const devMap = devRaw[0] as Map<string, unknown>;
  const devName = String(devMap.get("name"));
  const ownSkills = (devMap.get("skills") as string[]) || [];
  const ownSkillsSet = new Set(ownSkills);

  // Network recommendations: collaborators' skills with level info
  const networkRaw = await g
    .V(numId)
    .both("collaborates_with")
    .as("dev")
    .outE("knows")
    .as("edge")
    .inV()
    .as("skill")
    .select("dev", "edge", "skill")
    .by("name")
    .by("level")
    .by("name")
    .toList();

  const fromNetwork: { skill: string; knownBy: string; level: string }[] = [];
  const seen = new Set<string>();

  for (const row of networkRaw as Map<string, string>[]) {
    const skillName = String(row.get("skill"));
    const knownBy = String(row.get("dev"));
    const level = String(row.get("edge"));

    if (ownSkillsSet.has(skillName)) continue;

    const key = `${skillName}:${knownBy}`;
    if (seen.has(key)) continue;
    seen.add(key);

    fromNetwork.push({ skill: skillName, knownBy, level });
  }

  // Project recommendations: skills used by dev's projects but not known
  const projectSkillsRaw = await g
    .V(numId)
    .out("worked_on")
    .out("uses")
    .dedup()
    .values("name")
    .toList();

  const fromProjects = (projectSkillsRaw as string[]).filter(
    (s) => !ownSkillsSet.has(String(s))
  ).map(String);

  return {
    developer: devName,
    ownSkills,
    recommendations: { fromNetwork, fromProjects },
  };
}
