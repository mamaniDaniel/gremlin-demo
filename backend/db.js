const gremlin = require('gremlin');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });

const DriverRemoteConnection = gremlin.driver.DriverRemoteConnection;
const traversal = gremlin.process.AnonymousTraversalSource.traversal;

// IMPORTANTE: Si corrés este script desde tu PC, usa la IP de Proxmox.
// Si lo corrés dentro de Docker en la misma red, usa 'gremlin-db'.
const url = process.env.GREMLIN_URL || 'ws://localhost:8182/gremlin';

const connection = new DriverRemoteConnection(url, {
    mimeType: 'application/vnd.gremlin-v3.0+json'
});

const g = traversal().withRemote(connection);

module.exports = { g, connection };