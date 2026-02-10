import Link from "next/link";

const TECH_STACK = [
  {
    name: "Next.js 14",
    detail: "App Router, API Routes, SSR",
    color: "border-white/20 bg-white/5",
  },
  {
    name: "TypeScript",
    detail: "Strict mode, full type safety",
    color: "border-blue-400/30 bg-blue-400/5",
  },
  {
    name: "Tailwind CSS",
    detail: "Utility-first styling",
    color: "border-cyan-400/30 bg-cyan-400/5",
  },
  {
    name: "Redux Toolkit",
    detail: "RTK Query for API caching",
    color: "border-purple-400/30 bg-purple-400/5",
  },
  {
    name: "Gremlin",
    detail: "Graph traversal language",
    color: "border-green-400/30 bg-green-400/5",
  },
  {
    name: "Node.js",
    detail: "WebSocket connection to graph DB",
    color: "border-emerald-400/30 bg-emerald-400/5",
  },
  {
    name: "Docker",
    detail: "Compose for local + deploy",
    color: "border-sky-400/30 bg-sky-400/5",
  },
  {
    name: "Cloudflare",
    detail: "Tunnel + Zero Trust auth",
    color: "border-orange-400/30 bg-orange-400/5",
  },
];

export default function LandingPage() {
  return (
    <div className="h-screen overflow-y-auto snap-y snap-mandatory">
      {/* ── Slide 1: Hero ── */}
      <section className="h-screen snap-start flex flex-col items-center justify-center px-6 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent" />
        <div className="relative text-center max-w-3xl">
          <h1 className="text-7xl sm:text-8xl font-bold tracking-tight mb-4">
            Dev<span className="text-blue-400">Graph</span>
          </h1>
          <p className="text-xl sm:text-2xl text-gray-300 mb-2">
            Skill Recommender for Developer Networks
          </p>
          <p className="text-gray-500 mb-12">
            A graph database demo built with Gremlin + Next.js
          </p>
          <Link
            href="/explorer"
            className="inline-block px-8 py-3 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-medium transition-colors text-lg"
          >
            Explore the demo
          </Link>
        </div>
        <div className="absolute bottom-8 text-gray-600 text-sm animate-bounce">
          Scroll to explore ↓
        </div>
      </section>

      {/* ── Slide 2: The Challenge ── */}
      <section className="h-screen snap-start flex items-center justify-center px-6">
        <div className="max-w-2xl text-center">
          <h2 className="text-4xl sm:text-5xl font-bold mb-8">The Challenge</h2>
          <p className="text-lg sm:text-xl text-gray-300 leading-relaxed mb-6">
            Full-Stack Tech Lead role requiring graph database experience
            <br />
            <span className="text-gray-500">(Neptune + Gremlin preferred)</span>
          </p>
          <p className="text-lg sm:text-xl text-gray-300 leading-relaxed mb-10">
            I didn&apos;t know Gremlin.
            <br />
            So I learned it in a day and built a working demo.
          </p>
          <p className="text-2xl sm:text-3xl font-semibold text-blue-400 italic">
            {"\u201CShow, don\u2019t tell\u201D"}
          </p>
        </div>
      </section>

      {/* ── Slide 3: Tech Stack ── */}
      <section className="h-screen snap-start flex items-center justify-center px-6">
        <div className="max-w-3xl w-full text-center">
          <h2 className="text-4xl sm:text-5xl font-bold mb-3">Tech Stack</h2>
          <p className="text-gray-500 mb-10">
            Every technology the role requires — in one project
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {TECH_STACK.map((tech) => (
              <div
                key={tech.name}
                className={`rounded-xl border p-4 ${tech.color} transition-transform hover:scale-105`}
              >
                <p className="font-semibold text-white mb-1">{tech.name}</p>
                <p className="text-xs text-gray-400">{tech.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Slide 4: Architecture / Homelab ── */}
      <section className="h-screen snap-start flex items-center justify-center px-6">
        <div className="max-w-2xl w-full text-center">
          <h2 className="text-4xl sm:text-5xl font-bold mb-3">
            Self-Hosted on my Homelab
          </h2>
          <p className="text-gray-500 mb-10">
            Bare-metal Proxmox, Docker, Cloudflare Tunnel
          </p>

          {/* ASCII-style architecture diagram */}
          <div className="bg-gray-900/60 border border-gray-800 rounded-xl p-6 sm:p-8 text-left font-mono text-sm sm:text-base leading-relaxed">
            <p className="text-gray-400 mb-4">
              <span className="text-purple-400 font-semibold">Proxmox Server</span>{" "}
              <span className="text-gray-600">(bare metal)</span>
            </p>
            <p className="text-gray-400 ml-4 mb-1">
              <span className="text-gray-600">└─</span>{" "}
              <span className="text-sky-400">Docker</span>
            </p>
            <p className="text-gray-400 ml-10 mb-1">
              <span className="text-gray-600">├─</span>{" "}
              <span className="text-green-400">Gremlin Server</span>{" "}
              <span className="text-gray-600">:8182</span>{" "}
              <span className="text-gray-600 text-xs">(TinkerGraph, Neptune-compatible)</span>
            </p>
            <p className="text-gray-400 ml-10 mb-4">
              <span className="text-gray-600">└─</span>{" "}
              <span className="text-blue-400">Next.js App</span>{" "}
              <span className="text-gray-600">:3000</span>
            </p>
            <p className="text-gray-400 ml-14 mb-1">
              <span className="text-gray-600">└─</span>{" "}
              <span className="text-orange-400">Cloudflare Tunnel</span>{" "}
              <span className="text-gray-600">→</span>{" "}
              <span className="text-gray-300">HTTPS</span>{" "}
              <span className="text-gray-600">→</span>{" "}
              <span className="text-gray-300">Internet</span>
            </p>
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-3 text-sm">
            <span className="px-3 py-1 rounded-full bg-gray-800 border border-gray-700 text-gray-400">
              Zero-trust auth via Cloudflare Access
            </span>
            <span className="px-3 py-1 rounded-full bg-gray-800 border border-gray-700 text-gray-400">
              No ports exposed
            </span>
            <span className="px-3 py-1 rounded-full bg-gray-800 border border-gray-700 text-gray-400">
              OTP email authentication
            </span>
          </div>
        </div>
      </section>

      {/* ── Slide 5: How it Works ── */}
      <section className="h-screen snap-start flex items-center justify-center px-6">
        <div className="max-w-3xl w-full text-center">
          <h2 className="text-4xl sm:text-5xl font-bold mb-3">The Graph Model</h2>
          <p className="text-gray-500 mb-8">
            27 vertices · 94 edges · 5 edge types
          </p>

          {/* Edge relationships */}
          <div className="bg-gray-900/60 border border-gray-800 rounded-xl p-6 sm:p-8 text-left font-mono text-sm sm:text-base space-y-2 mb-8">
            <p>
              <span className="text-blue-400">[developer]</span>
              <span className="text-gray-600"> —knows→ </span>
              <span className="text-green-400">[skill]</span>
            </p>
            <p>
              <span className="text-blue-400">[developer]</span>
              <span className="text-gray-600"> —worked_on→ </span>
              <span className="text-amber-400">[project]</span>
            </p>
            <p>
              <span className="text-blue-400">[developer]</span>
              <span className="text-gray-600"> —works_at→ </span>
              <span className="text-purple-400">[company]</span>
            </p>
            <p>
              <span className="text-blue-400">[developer]</span>
              <span className="text-gray-600"> —collaborates_with→ </span>
              <span className="text-blue-400">[developer]</span>
            </p>
            <p>
              <span className="text-amber-400">[project]</span>
              <span className="text-gray-600"> —uses→ </span>
              <span className="text-green-400">[skill]</span>
            </p>
          </div>

          {/* Star query */}
          <div className="bg-gray-900/60 border border-blue-500/20 rounded-xl p-6 text-left">
            <p className="text-xs text-blue-400 uppercase tracking-wider mb-3 font-sans font-medium">
              Star Query: {"\u201CIf I hire Daniel, what skills does his network bring?\u201D"}
            </p>
            <pre className="text-sm text-gray-300 overflow-x-auto">
              <code>{`g.V().has('developer','name','Daniel')
  .both('collaborates_with')
  .out('knows').dedup().values('name')`}</code>
            </pre>
          </div>
        </div>
      </section>

      {/* ── Slide 6: Try it ── */}
      <section className="h-screen snap-start flex items-center justify-center px-6">
        <div className="max-w-2xl text-center">
          <h2 className="text-4xl sm:text-5xl font-bold mb-10">
            Explore the Demo
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
            <Link
              href="/explorer"
              className="group rounded-xl border border-gray-800 bg-gray-900/50 p-8 hover:border-blue-500/50 hover:bg-blue-500/5 transition-all"
            >
              <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors">
                Graph Explorer
              </h3>
              <p className="text-sm text-gray-400">
                Interactive force-directed graph visualization. Drag, zoom, hover to explore all nodes and edges.
              </p>
            </Link>
            <Link
              href="/recommend"
              className="group rounded-xl border border-gray-800 bg-gray-900/50 p-8 hover:border-green-500/50 hover:bg-green-500/5 transition-all"
            >
              <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-green-400 transition-colors">
                Skill Recommender
              </h3>
              <p className="text-sm text-gray-400">
                Select a developer and discover skills from their network and project history.
              </p>
            </Link>
          </div>
          <p className="text-gray-600 text-sm">
            Built in one day. Ready for production with Amazon Neptune.
          </p>
        </div>
      </section>
    </div>
  );
}
