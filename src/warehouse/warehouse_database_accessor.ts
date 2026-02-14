// src/warehouse/warehouse_database_accessor.ts

import { MongoMemoryServer } from 'mongodb-memory-server'
import { MongoClient, Db, Collection } from 'mongodb'
import type { BookID, ShelfId } from '../types.js'

let warehouseServer: MongoMemoryServer | null = null
let warehouseClient: MongoClient | null = null
let warehouseDb: Db | null = null

export interface WarehouseDatabaseAccessor {
  shelves: Collection<{ bookId: BookID, shelf: ShelfId, count: number }>
  orders: Collection<{ books: Record<BookID, number> }>
}

export async function getWarehouseDatabase(): Promise<WarehouseDatabaseAccessor> {
  // Create the memory server once
  if (!warehouseServer) {
    warehouseServer = await MongoMemoryServer.create()
  }

  // Create the client once
  if (!warehouseClient) {
    warehouseClient = new MongoClient(warehouseServer.getUri())
    await warehouseClient.connect()
  }

 
  if (!warehouseDb) {
    warehouseDb = warehouseClient.db('warehouse')
  }

  return {
    shelves: warehouseDb.collection('shelves'),
    orders: warehouseDb.collection('orders')
  }
}