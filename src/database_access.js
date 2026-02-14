import { MongoMemoryServer } from 'mongodb-memory-server';
import { MongoClient } from 'mongodb';
let server = null;
let client = null;
let db = null;
export async function getBookDatabase() {
    // Create the memory server once
    if (!server) {
        server = await MongoMemoryServer.create();
    }
    // Create the client once
    if (!client) {
        client = new MongoClient(server.getUri());
        await client.connect();
    }
    // Create the DB once
    if (!db) {
        db = client.db('books');
    }
    return {
        database: db,
        books: db.collection('books')
    };
}
