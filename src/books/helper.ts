// src/books/helpers.ts

import type { Book, Filter } from '../types.js'

export function buildQueryFromFilters(filters: Filter[]): any {
  if (!filters || filters.length === 0) {
    return {}
  }

  const mongoFilters = filters.map(f => {
    const query: any = {}

    if (f.from !== undefined) {
      query.price = { ...query.price, $gte: f.from }
    }

    if (f.to !== undefined) {
      query.price = { ...query.price, $lte: f.to }
    }

    if (f.name) {
      query.name = { $regex: f.name, $options: 'i' }
    }

    if (f.author) {
      query.author = { $regex: f.author, $options: 'i' }
    }

    return query
  })

  // If multiple filters exist, match ANY of them
  return mongoFilters.length > 1 ? { $or: mongoFilters } : mongoFilters[0]
}

export function mapDatabaseBookToApiBook(dbBook: any): Book {
  return {
id: (dbBook.id ?? dbBook._id)?.toString() ?? "",

    name: dbBook.name,
    author: dbBook.author,
    description: dbBook.description,
    price: dbBook.price,
    image: dbBook.image,
    stock: dbBook.stock
  }
}