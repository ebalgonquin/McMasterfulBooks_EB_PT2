import { MongoMemoryServer } from 'mongodb-memory-server'
import { MongoClient, Db, Collection } from 'mongodb'
import type { Book } from './types.js'

let server: MongoMemoryServer | null = null
let client: MongoClient | null = null
let db: Db | null = null

export interface BookDatabaseAccessor {
  database: Db
  books: Collection<Book>
}

export async function getBookDatabase(): Promise<BookDatabaseAccessor> {
  // Create the memory server once
  if (!server) {
    server = await MongoMemoryServer.create()
  }

  // Create the client once
  if (!client) {
    client = new MongoClient(server.getUri())
    await client.connect()
  }

  // Create the DB once
  if (!db) {
    db = client.db('books')
  }

  return {
    database: db,
    books: db.collection<Book>('books')
  }
}