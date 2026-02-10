const { g, connection } = require('./backend/db');

async function runDemo() {
    try {
        console.log("Conectando y limpiando base...");
        // Borra todo para empezar de cero (Cuidado: solo para el demo!)
        await g.V().drop().iterate();
        const count = await g.V().count().next();
        console.log("Vértices iniciales (post-drop):", count.value);

        // 1. Crear Nodos (Vértices)
        console.log("Creando nodos...");
        const v1 = await g.addV('user').property('name', 'Daniel').property('role', 'Lead').next();
        const v2 = await g.addV('user').property('name', 'Sara').next();
        const v3 = await g.addV('skill').property('name', 'Amazon Neptune').next();

        // 2. Crear Relaciones (Edges)
        console.log("Creando relaciones...");
        await g.V(v1.value).addE('married_to').to(v2.value).iterate();
        await g.V(v1.value).addE('interested_in').to(v3.value).iterate();

        // 3. Consulta de Grafo (Lo que hace potente a Neptune)
        // "¿Qué skills le interesan a personas casadas con Sara?"
        console.log("Consultando relaciones complejas...");
        const results = await g.V().has('name', 'Sara')
            .in_('married_to')     // Quién está casado con ella
            .out('interested_in')  // Qué le interesa a esa persona
            .values('name')
            .toList();

        console.log("Resultado de la recomendación:", results);

    } catch (err) {
        console.error("Error en el demo:", err);
    } finally {
        await connection.close();
    }
}

runDemo();