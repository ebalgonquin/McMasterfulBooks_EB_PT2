

import { getBookDatabase } from '../database_access.js'
import type { Book, BookID } from '../types.js'
import { mapDatabaseBookToApiBook } from '../books/helper.js'
import type { ZodRouter } from '../../api/router.js'
import { getWarehouse } from '../warehouse_access.js'

export async function lookupBookByIdDomain(id: BookID): Promise<Book> {
  // getBookDatabase() returns a Promise → must await it
  const db = await getBookDatabase()
  const { books } = db

  const result = await books.findOne({ id })

  if (!result) {
    throw new Error(`Book with ID ${id} not found`)
  }

  const apiBook = mapDatabaseBookToApiBook(result)

  // Add stock from warehouse
  const warehouse = getWarehouse()
  const copies = await warehouse.getCopies(apiBook.id)   // apiBook.id is now always a string
  const stock = Object.values(copies).reduce((a, b) => a + b, 0)

  return {
    ...apiBook,
    stock
  }
}

export default function lookupBookByIdRoute(router: ZodRouter): void {
  router.register({
    handler: async (ctx: any, next: any) => {
      const { id } = ctx.request.params

      const result = await lookupBookByIdDomain(id)
      ctx.body = result

      await next()
    }
  })
}