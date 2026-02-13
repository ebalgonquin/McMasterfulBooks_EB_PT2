

import type { ZodRouter } from '../../api/router.js'
import { getBookDatabase, type BookDatabaseAccessor } from '../database_access.js'
import type { Book, Filter } from '../types.js'
import { buildQueryFromFilters, mapDatabaseBookToApiBook } from '../books/helper.js'
import { getWarehouse } from '../warehouse_access.js'

// Domain logic
async function listBooks(filters: Filter[], database: BookDatabaseAccessor): Promise<Book[]> {
  const query = buildQueryFromFilters(filters)
  const result = await database.books.find(query).toArray()

  const warehouse = getWarehouse()

  const books: Book[] = []

  for (const dbBook of result) {
    const apiBook = mapDatabaseBookToApiBook(dbBook)

    // apiBook.id is guaranteed to be a string after fixing types.ts + mapper
    const copies = await warehouse.getCopies(apiBook.id)
    const stock = Object.values(copies).reduce((a, b) => a + b, 0)

    books.push({
      ...apiBook,
      stock
    })
  }

  return books
}

// Route wrapper
export default function listBooksRoute(router: ZodRouter): void {
  router.register({
    handler: async (ctx: any, next: any) => {
      // Ensure filters is ALWAYS an array
      const { filters = [] } = ctx.request.query

      // getBookDatabase() returns a Promise → must await it
      const db = await getBookDatabase()

      const result = await listBooks(filters, db)
      ctx.body = result

      await next()
    }
  })
}