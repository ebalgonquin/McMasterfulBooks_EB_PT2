
import { InMemoryWarehouse } from './in_memory_warehouse.js';
import { randomUUID } from 'crypto';
export class DatabaseWarehouse {
    accessor;
    constructor(accessor) {
        this.accessor = accessor;
    }
    async placeBookOnShelf(bookId, shelf, count) {
        await this.accessor.shelves.updateOne({ bookId, shelf }, { $inc: { count } }, { upsert: true });
    }
    async getCopiesOnShelf(bookId, shelf) {
        const doc = await this.accessor.shelves.findOne({ bookId, shelf });
        return doc?.count ?? 0;
    }
    async getCopies(bookId) {
        const docs = await this.accessor.shelves.find({ bookId }).toArray();
        const result = {};
        for (const d of docs) {
            result[d.shelf] = d.count;
        }
        return result;
    }
    async placeOrder(books) {
        const order = { books };
        const result = await this.accessor.orders.insertOne(order);
        return result.insertedId.toString();
    }
    async getOrder(orderId) {
        const doc = await this.accessor.orders.findOne({ _id: orderId });
        return doc?.books ?? false;
    }
    async listOrders() {
        const docs = await this.accessor.orders.find().toArray();
        return docs.map((d) => ({
            orderId: d._id.toString(),
            books: d.books
        }));
    }
    async removeOrder(orderId) {
        await this.accessor.orders.deleteOne({ _id: orderId });
    }
    async fulfillOrder(orderId) {
        const order = await this.getOrder(orderId);
        if (!order)
            return;
        for (const [bookId, qty] of Object.entries(order)) {
            let remaining = qty;
            const shelves = await this.accessor.shelves.find({ bookId }).toArray();
            for (const shelf of shelves) {
                if (remaining <= 0)
                    break;
                const take = Math.min(shelf.count, remaining);
                await this.accessor.shelves.updateOne({ bookId, shelf: shelf.shelf }, { $inc: { count: -take } });
                remaining -= take;
            }
        }
    }
}
if (import.meta.vitest) {
    const { test, expect } = import.meta.vitest;
    const { getWarehouseDatabase } = await import('./warehouse_database_accessor.js');
    test('placing a book adds the book to the database', async () => {
        const mem = new InMemoryWarehouse();
        const db = new DatabaseWarehouse(await getWarehouseDatabase());
        const book = randomUUID();
        const shelf = 'my_shelf';
        const copies = 5;
        await Promise.all([
            mem.placeBookOnShelf(book, shelf, copies),
            db.placeBookOnShelf(book, shelf, copies)
        ]);
        const [memResult, dbResult] = await Promise.all([
            mem.getCopiesOnShelf(book, shelf),
            db.getCopiesOnShelf(book, shelf)
        ]);
        expect(memResult).toEqual(dbResult);
        expect(dbResult).toEqual(5);
    });
}
