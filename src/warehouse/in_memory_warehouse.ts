import type { WarehouseData } from './warehouse_data.js'
import type { BookID, ShelfId, OrderId } from '../types.js'

export class InMemoryWarehouse implements WarehouseData {
  books: Record<BookID, Record<ShelfId, number>>
  orders: Record<OrderId, Record<BookID, number>>

  constructor() {
    this.books = {}
    this.orders = {}
  }

async placeBookOnShelf(bookId: BookID, shelf: ShelfId, count: number): Promise<void> {
  if (!this.books[bookId]) {
    this.books[bookId] = {}
  }

  if (!this.books[bookId][shelf]) {
    this.books[bookId][shelf] = 0
  }

  this.books[bookId][shelf] += count
}

  async fulfillOrder(orderId: OrderId): Promise<void> {
  const order = await this.getOrder(orderId)
  if (!order) {
    throw new Error('Order not found')
  }

  // Check stock
  for (const bookId of Object.keys(order)) {
    const needed = order[bookId]
    const shelves = await this.getCopies(bookId)

    const total = Object.values(shelves).reduce((a, b) => a + b, 0)

    if (total < needed) {
      throw new Error('Not enough stock to fulfill order')
    }
  }

  // Remove stock from shelves
  for (const bookId of Object.keys(order)) {
    let remaining = order[bookId]
    const shelves = await this.getCopies(bookId)

    for (const shelf of Object.keys(shelves)) {
      if (remaining <= 0) break

      const available = shelves[shelf]
      const take = Math.min(available, remaining)

      this.books[bookId][shelf] = available - take
      remaining -= take
    }
  }
  await this.removeOrder(orderId)
}



  async getCopiesOnShelf(bookId: BookID, shelf: ShelfId): Promise<number> {
    return this.books[bookId]?.[shelf] ?? 0
  }

 async getCopies(bookId: BookID): Promise<Record<ShelfId, number>> {
  return this.books[bookId] ?? {}
}

 async placeOrder(books: Record<BookID, number>): Promise<OrderId> {
  const id = crypto.randomUUID() as OrderId
  this.orders[id] = books
  return id
}

  async getOrder(orderId: OrderId): Promise<Record<BookID, number> | false> {
    return this.orders[orderId] ?? false
  }
async listOrders(): Promise<Array<{ orderId: OrderId, books: Record<BookID, number> }>> {
  return Object.entries(this.orders).map(([orderId, books]) => ({
    orderId: orderId as OrderId,
    books
  }))
}

  async removeOrder(orderId: OrderId): Promise<void> {
    delete this.orders[orderId]
  }
}