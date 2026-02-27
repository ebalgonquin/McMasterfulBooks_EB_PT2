import { MongoMemoryServer } from 'mongodb-memory-server'
import { MongoClient, Db, Collection } from 'mongodb'
import type { Book, WarehouseItem } from './types.js'

// Shared memory server + client
let server: MongoMemoryServer | null = null
let client: MongoClient | null = null

async function getClient(): Promise<MongoClient> {
  if (!server) {
    server = await MongoMemoryServer.create()
  }
  if (!client) {
    client = new MongoClient(server.getUri())
    await client.connect()
  }
  return client
}



export interface BookDatabaseAccessor {
  database: Db
  books: Collection<Book>
}

export async function getBookDatabase(dbName?: string): Promise<BookDatabaseAccessor> {
  const client = await getClient()

  // Random DB name for test isolation
  const name = dbName ?? Math.floor(Math.random() * 100000).toString()
  const database = client.db(name)

  return {
    database,
    books: database.collection<Book>('books')
  }
}



export interface WarehouseDatabaseAccessor {
  database: Db
  warehouse: Collection<WarehouseItem>
}

export async function getWarehouseDatabase(dbName?: string): Promise<WarehouseDatabaseAccessor> {
  const client = await getClient()

  const name = dbName ?? Math.floor(Math.random() * 100000).toString()
  const database = client.db(name)

  return {
    database,
    warehouse: database.collection<WarehouseItem>('warehouse')
  }
}


export type AppDatabaseState =
  BookDatabaseAccessor &
  WarehouseDatabaseAccessor

export async function getDatabaseState(dbName?: string): Promise<AppDatabaseState> {
  const books = await getBookDatabase(dbName)
  const warehouse = await getWarehouseDatabase(dbName)

  return {
    ...books,
    ...warehouse
  }
}