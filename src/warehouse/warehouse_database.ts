// src/warehouse/warehouse_database.ts

import type { WarehouseData } from './warehouse_data.js'
import type { WarehouseDatabaseAccessor } from './warehouse_database_accessor.ts'
import { InMemoryWarehouse } from './in_memory_warehouse.js'
import type { BookID, ShelfId } from '../types.js'
import { randomUUID } from 'crypto'
import { ObjectId } from 'mongodb'

export class DatabaseWarehouse implements WarehouseData {
  accessor: WarehouseDatabaseAccessor

  constructor(accessor: WarehouseDatabaseAccessor) {
    this.accessor = accessor
  }

  async placeBookOnShelf(bookId: BookID, shelf: ShelfId, count: number): Promise<void> {
    await this.accessor.shelves.updateOne(
      { bookId, shelf },
      { $inc: { count } },
      { upsert: true }
    )
  }

  async getCopiesOnShelf(bookId: BookID, shelf: ShelfId): Promise<number> {
    const doc = await this.accessor.shelves.findOne({ bookId, shelf })
    return doc?.count ?? 0
  }

  async getCopies(bookId: BookID): Promise<Record<ShelfId, number>> {
    const docs = await this.accessor.shelves.find({ bookId }).toArray()
    const result: Record<ShelfId, number> = {}
    for (const d of docs) {
      result[d.shelf] = d.count
    }
    return result
  }

  async placeOrder(books: Record<BookID, number>) {
    const order = { books }
    const result = await this.accessor.orders.insertOne(order)
    return result.insertedId.toString()
  }

  async getOrder(orderId: string) {
    const doc = await this.accessor.orders.findOne({ _id: new ObjectId(orderId) })
    return doc?.books ?? false
  }

  async listOrders() {
    const docs = await this.accessor.orders.find().toArray()
    return docs.map((d: any) => ({
      orderId: d._id.toString(),
      books: d.books
    }))
  }

  async removeOrder(orderId: string) {
    await this.accessor.orders.deleteOne({ _id: new ObjectId(orderId) })
  }

  async fulfillOrder(orderId: string) {
    const order = await this.getOrder(orderId)
    if (!order) return

    for (const [bookId, qty] of Object.entries(order) as [BookID, number][]) {
      let remaining = qty

      const shelves = await this.accessor.shelves.find({ bookId }).toArray()

      for (const shelf of shelves) {
        if (remaining <= 0) break

        const take = Math.min(shelf.count, remaining)

        await this.accessor.shelves.updateOne(
          { bookId, shelf: shelf.shelf },
          { $inc: { count: -take } }
        )

        remaining -= take
      }
    }
  }
}

// @ts-ignore
if (import.meta.vitest) {
  // @ts-ignore
  const { test, expect } = import.meta.vitest
 const { getWarehouseDatabase } = await import('./warehouse_database_accessor.ts')

  test('placing a book adds the book to the database', async () => {
    const mem = new InMemoryWarehouse()
    const db = new DatabaseWarehouse(await getWarehouseDatabase())

    const book = randomUUID() as BookID
    const shelf = 'my_shelf'
    const copies = 5

    await Promise.all([
      mem.placeBookOnShelf(book, shelf, copies),
      db.placeBookOnShelf(book, shelf, copies)
    ])

    const [memResult, dbResult] = await Promise.all([
      mem.getCopiesOnShelf(book, shelf),
      db.getCopiesOnShelf(book, shelf)
    ])

    expect(memResult).toEqual(dbResult)
    expect(dbResult).toEqual(5)
  })
}