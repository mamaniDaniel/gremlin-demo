const gremlin = require('gremlin');

const DriverRemoteConnection = gremlin.driver.DriverRemoteConnection;
const traversal = gremlin.process.AnonymousTraversalSource.traversal;

const url = process.env.GREMLIN_URL || 'ws://localhost:8182/gremlin';
const connection = new DriverRemoteConnection(url, {
    mimeType: 'application/vnd.gremlin-v3.0+json'
});
const g = traversal().withRemote(connection);

// --- Data ---

const developers = [
    { name: 'Daniel', role: 'Tech Lead', seniority: 'senior' },
    { name: 'Sara', role: 'Frontend Engineer', seniority: 'senior' },
    { name: 'Lucas', role: 'Backend Engineer', seniority: 'mid' },
    { name: 'Maria', role: 'Full Stack Developer', seniority: 'senior' },
    { name: 'Juan', role: 'DevOps Engineer', seniority: 'mid' },
    { name: 'Ana', role: 'Frontend Engineer', seniority: 'junior' },
    { name: 'Carlos', role: 'Data Engineer', seniority: 'senior' },
    { name: 'Sofia', role: 'Backend Engineer', seniority: 'mid' },
];

const skills = [
    { name: 'React', category: 'frontend' },
    { name: 'Next.js', category: 'frontend' },
    { name: 'TypeScript', category: 'language' },
    { name: 'Tailwind', category: 'frontend' },
    { name: 'Redux', category: 'frontend' },
    { name: 'Node.js', category: 'backend' },
    { name: 'Gremlin', category: 'database' },
    { name: 'AWS', category: 'cloud' },
    { name: 'Python', category: 'language' },
    { name: 'Docker', category: 'devops' },
    { name: 'GraphQL', category: 'backend' },
    { name: 'PostgreSQL', category: 'database' },
];

const projects = [
    { name: 'E-commerce Platform', description: 'Marketplace with React and microservices' },
    { name: 'Analytics Dashboard', description: 'Real-time metrics dashboard' },
    { name: 'Chat App', description: 'Messaging app with WebSockets' },
    { name: 'DevGraph', description: 'Developer network visualizer' },
];

const companies = [
    { name: 'Startup X' },
    { name: 'Tech Corp' },
    { name: 'Freelance' },
];

const devSkills = [
    { dev: 'Daniel', skill: 'React', level: 'senior' },
    { dev: 'Daniel', skill: 'TypeScript', level: 'senior' },
    { dev: 'Daniel', skill: 'Node.js', level: 'senior' },
    { dev: 'Daniel', skill: 'Gremlin', level: 'junior' },
    { dev: 'Daniel', skill: 'AWS', level: 'mid' },
    { dev: 'Daniel', skill: 'Docker', level: 'mid' },

    { dev: 'Sara', skill: 'React', level: 'senior' },
    { dev: 'Sara', skill: 'Next.js', level: 'senior' },
    { dev: 'Sara', skill: 'TypeScript', level: 'senior' },
    { dev: 'Sara', skill: 'Tailwind', level: 'senior' },
    { dev: 'Sara', skill: 'Redux', level: 'mid' },

    { dev: 'Lucas', skill: 'Node.js', level: 'senior' },
    { dev: 'Lucas', skill: 'PostgreSQL', level: 'mid' },
    { dev: 'Lucas', skill: 'Docker', level: 'mid' },
    { dev: 'Lucas', skill: 'GraphQL', level: 'junior' },

    { dev: 'Maria', skill: 'React', level: 'senior' },
    { dev: 'Maria', skill: 'Node.js', level: 'senior' },
    { dev: 'Maria', skill: 'TypeScript', level: 'mid' },
    { dev: 'Maria', skill: 'AWS', level: 'senior' },
    { dev: 'Maria', skill: 'GraphQL', level: 'mid' },
    { dev: 'Maria', skill: 'PostgreSQL', level: 'senior' },

    { dev: 'Juan', skill: 'Docker', level: 'senior' },
    { dev: 'Juan', skill: 'AWS', level: 'senior' },
    { dev: 'Juan', skill: 'Python', level: 'mid' },
    { dev: 'Juan', skill: 'Node.js', level: 'junior' },

    { dev: 'Ana', skill: 'React', level: 'mid' },
    { dev: 'Ana', skill: 'Tailwind', level: 'mid' },
    { dev: 'Ana', skill: 'TypeScript', level: 'junior' },
    { dev: 'Ana', skill: 'Next.js', level: 'junior' },

    { dev: 'Carlos', skill: 'Python', level: 'senior' },
    { dev: 'Carlos', skill: 'AWS', level: 'senior' },
    { dev: 'Carlos', skill: 'PostgreSQL', level: 'senior' },
    { dev: 'Carlos', skill: 'Gremlin', level: 'mid' },
    { dev: 'Carlos', skill: 'Docker', level: 'mid' },

    { dev: 'Sofia', skill: 'Node.js', level: 'senior' },
    { dev: 'Sofia', skill: 'TypeScript', level: 'mid' },
    { dev: 'Sofia', skill: 'GraphQL', level: 'senior' },
    { dev: 'Sofia', skill: 'Redux', level: 'mid' },
    { dev: 'Sofia', skill: 'PostgreSQL', level: 'mid' },
];

const devProjects = [
    { dev: 'Daniel', project: 'E-commerce Platform' },
    { dev: 'Daniel', project: 'DevGraph' },
    { dev: 'Sara', project: 'E-commerce Platform' },
    { dev: 'Sara', project: 'Analytics Dashboard' },
    { dev: 'Lucas', project: 'Chat App' },
    { dev: 'Lucas', project: 'E-commerce Platform' },
    { dev: 'Maria', project: 'Analytics Dashboard' },
    { dev: 'Maria', project: 'Chat App' },
    { dev: 'Juan', project: 'E-commerce Platform' },
    { dev: 'Juan', project: 'DevGraph' },
    { dev: 'Ana', project: 'Analytics Dashboard' },
    { dev: 'Carlos', project: 'DevGraph' },
    { dev: 'Carlos', project: 'Chat App' },
    { dev: 'Sofia', project: 'Chat App' },
    { dev: 'Sofia', project: 'Analytics Dashboard' },
];

const devCompanies = [
    { dev: 'Daniel', company: 'Startup X' },
    { dev: 'Sara', company: 'Startup X' },
    { dev: 'Lucas', company: 'Tech Corp' },
    { dev: 'Maria', company: 'Tech Corp' },
    { dev: 'Juan', company: 'Startup X' },
    { dev: 'Ana', company: 'Freelance' },
    { dev: 'Carlos', company: 'Tech Corp' },
    { dev: 'Sofia', company: 'Freelance' },
];

const collaborations = [
    { from: 'Daniel', to: 'Sara' },
    { from: 'Daniel', to: 'Lucas' },
    { from: 'Daniel', to: 'Juan' },
    { from: 'Sara', to: 'Maria' },
    { from: 'Sara', to: 'Ana' },
    { from: 'Lucas', to: 'Sofia' },
    { from: 'Lucas', to: 'Maria' },
    { from: 'Maria', to: 'Carlos' },
    { from: 'Juan', to: 'Carlos' },
    { from: 'Carlos', to: 'Sofia' },
    { from: 'Ana', to: 'Sofia' },
];

const projectSkills = [
    { project: 'E-commerce Platform', skill: 'React' },
    { project: 'E-commerce Platform', skill: 'Node.js' },
    { project: 'E-commerce Platform', skill: 'TypeScript' },
    { project: 'E-commerce Platform', skill: 'PostgreSQL' },
    { project: 'E-commerce Platform', skill: 'Docker' },
    { project: 'E-commerce Platform', skill: 'AWS' },

    { project: 'Analytics Dashboard', skill: 'React' },
    { project: 'Analytics Dashboard', skill: 'Next.js' },
    { project: 'Analytics Dashboard', skill: 'Tailwind' },
    { project: 'Analytics Dashboard', skill: 'Redux' },
    { project: 'Analytics Dashboard', skill: 'GraphQL' },

    { project: 'Chat App', skill: 'Node.js' },
    { project: 'Chat App', skill: 'TypeScript' },
    { project: 'Chat App', skill: 'GraphQL' },
    { project: 'Chat App', skill: 'PostgreSQL' },

    { project: 'DevGraph', skill: 'React' },
    { project: 'DevGraph', skill: 'Gremlin' },
    { project: 'DevGraph', skill: 'Node.js' },
    { project: 'DevGraph', skill: 'Docker' },
    { project: 'DevGraph', skill: 'AWS' },
    { project: 'DevGraph', skill: 'TypeScript' },
];

// --- Seed ---

async function seed() {
    try {
        console.log(`Connecting to ${url}...`);
        console.log('Dropping all vertices...');
        await g.V().drop().iterate();

        const count = await g.V().count().next();
        console.log(`Vertices after drop: ${count.value}`);

        console.log('Creating developers...');
        const devV = {};
        for (const dev of developers) {
            const v = await g.addV('developer')
                .property('name', dev.name)
                .property('role', dev.role)
                .property('seniority', dev.seniority)
                .next();
            devV[dev.name] = v.value;
            console.log(`  ${dev.name} (${dev.role})`);
        }

        console.log('Creating skills...');
        const skillV = {};
        for (const skill of skills) {
            const v = await g.addV('skill')
                .property('name', skill.name)
                .property('category', skill.category)
                .next();
            skillV[skill.name] = v.value;
            console.log(`  ${skill.name} [${skill.category}]`);
        }

        console.log('Creating projects...');
        const projectV = {};
        for (const project of projects) {
            const v = await g.addV('project')
                .property('name', project.name)
                .property('description', project.description)
                .next();
            projectV[project.name] = v.value;
            console.log(`  ${project.name}`);
        }

        console.log('Creating companies...');
        const companyV = {};
        for (const company of companies) {
            const v = await g.addV('company')
                .property('name', company.name)
                .next();
            companyV[company.name] = v.value;
            console.log(`  ${company.name}`);
        }

        console.log('Linking developers to skills...');
        for (const rel of devSkills) {
            await g.V(devV[rel.dev])
                .addE('knows')
                .to(skillV[rel.skill])
                .property('level', rel.level)
                .iterate();
        }
        console.log(`  ${devSkills.length} edges created`);

        console.log('Linking developers to projects...');
        for (const rel of devProjects) {
            await g.V(devV[rel.dev])
                .addE('worked_on')
                .to(projectV[rel.project])
                .iterate();
        }
        console.log(`  ${devProjects.length} edges created`);

        console.log('Linking developers to companies...');
        for (const rel of devCompanies) {
            await g.V(devV[rel.dev])
                .addE('works_at')
                .to(companyV[rel.company])
                .iterate();
        }
        console.log(`  ${devCompanies.length} edges created`);

        console.log('Linking collaborations...');
        for (const rel of collaborations) {
            await g.V(devV[rel.from])
                .addE('collaborates_with')
                .to(devV[rel.to])
                .iterate();
        }
        console.log(`  ${collaborations.length} edges created`);

        console.log('Linking projects to skills...');
        for (const rel of projectSkills) {
            await g.V(projectV[rel.project])
                .addE('uses')
                .to(skillV[rel.skill])
                .iterate();
        }
        console.log(`  ${projectSkills.length} edges created`);

        const totalV = await g.V().count().next();
        const totalE = await g.E().count().next();
        console.log('\n========================================');
        console.log('Seed complete');
        console.log(`  Vertices: ${totalV.value}`);
        console.log(`  Edges:    ${totalE.value}`);
        console.log('========================================');

    } catch (err) {
        console.error('Seed error:', err);
    } finally {
        await connection.close();
    }
}

seed();
