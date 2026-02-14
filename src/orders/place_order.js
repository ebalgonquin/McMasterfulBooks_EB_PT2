// src/orders/place_order.ts
import { getBookDatabase } from '../database_access.js';
import { getWarehouse } from '../warehouse_access.js';
export async function placeOrderDomain(order) {
    const db = await getBookDatabase();
    const { books } = db;
    const warehouse = getWarehouse();
    // Validate all BookIDs
    for (const item of order.items) {
        const exists = await books.findOne({ id: item.bookId });
        if (!exists) {
            throw new Error(`Invalid BookID: ${item.bookId}`);
        }
    }
    // Convert items into the shape the warehouse expects
    const bookMap = {};
    for (const item of order.items) {
        bookMap[item.bookId] = item.quantity;
    }
    // Place the order in the warehouse system
    const orderId = await warehouse.placeOrder(bookMap);
    // Fulfill the order (this deducts stock)
    await warehouse.fulfillOrder(orderId);
    return {
        status: 'success',
        orderId,
        items: order.items
    };
}
export default function placeOrderRoute(router) {
    router.register({
        handler: async (ctx, next) => {
            const order = ctx.request.body;
            const result = await placeOrderDomain(order);
            ctx.body = result;
            await next();
        }
    });
}
