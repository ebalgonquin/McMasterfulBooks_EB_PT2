import { OrderId } from "../../adapter/assignment-4.js";
import { BookID, ShelfId } from "../types.js";

export interface WarehouseData {
  placeBookOnShelf: (bookId: BookID, shelf: ShelfId, count: number) => Promise<void>
  getCopiesOnShelf: (bookId: BookID, shelf: ShelfId) => Promise<number>
  getCopies: (bookId: BookID) => Promise<Record<ShelfId, number>>

  placeOrder: (books: Record<BookID, number>) => Promise<OrderId>
  getOrder: (order: OrderId) => Promise<Record<BookID, number> | false>
  listOrders: () => Promise<Array<{ orderId: OrderId, books: Record<BookID, number> }>>
  removeOrder: (order: OrderId) => Promise<void>


  fulfillOrder: (orderId: OrderId) => Promise<void>
}