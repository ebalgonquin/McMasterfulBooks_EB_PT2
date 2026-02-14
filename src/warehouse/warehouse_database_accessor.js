
export async function getWarehouseDatabase() {
   
    const { getDb } = await import('../database_access.js');
    const db = await getDb('warehouse'); // separate bounded context
    return {
        shelves: db.collection('shelves'),
        orders: db.collection('orders')
    };
}
