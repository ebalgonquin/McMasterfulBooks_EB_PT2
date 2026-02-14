import { test, expect } from 'vitest';
import { InMemoryWarehouse } from './in_memory_warehouse.js';
test('placing books on a shelf stores them', async () => {
    const wh = new InMemoryWarehouse();
    await wh.placeBookOnShelf('abc', 'A1', 5);
    const copies = await wh.getCopiesOnShelf('abc', 'A1');
    expect(copies).toBe(5);
});
test('getCopies returns all shelves for a book', async () => {
    const wh = new InMemoryWarehouse();
    await wh.placeBookOnShelf('abc', 'A1', 5);
    await wh.placeBookOnShelf('abc', 'B7', 3);
    const copies = await wh.getCopies('abc');
    expect(copies).toEqual({
        A1: 5,
        B7: 3
    });
});
test('placing an order returns a new order ID', async () => {
    const wh = new InMemoryWarehouse();
    const orderId = await wh.placeOrder({
        abc: 2,
        xyz: 1
    });
    expect(typeof orderId).toBe('string');
    expect(orderId.length).toBeGreaterThan(0);
});
test('getOrder returns the correct order', async () => {
    const wh = new InMemoryWarehouse();
    const orderId = await wh.placeOrder({
        abc: 2,
        xyz: 1
    });
    const order = await wh.getOrder(orderId);
    expect(order).toEqual({
        abc: 2,
        xyz: 1
    });
});
test('listOrders returns orders in insertion order', async () => {
    const wh = new InMemoryWarehouse();
    const orderId1 = await wh.placeOrder({ abc: 2 });
    const orderId2 = await wh.placeOrder({ xyz: 1 });
    const orders = await wh.listOrders();
    expect(orders).toEqual([
        { oderId: orderId1, books: { abc: 2 } },
        { orderId: orderId2, books: { xyz: 1 } }
    ]);
});
test('removeOrder deletes an order', async () => {
    const wh = new InMemoryWarehouse();
    const orderId = await wh.placeOrder({ abc: 2 });
    expect(await wh.getOrder(orderId)).toEqual({ abc: 2 });
    await wh.removeOrder(orderId);
    expect(await wh.getOrder(orderId)).toBe(false);
});
test('cannot fulfill an order when stock is insufficient', async () => {
    const wh = new InMemoryWarehouse();
    await wh.placeBookOnShelf('abc', 'A1', 1);
    const orderId = await wh.placeOrder({ abc: 2 });
    await expect(async () => {
        await wh.fulfillOrder(orderId);
    }).rejects.toThrow('Not enough stock to fulfill order');
});
