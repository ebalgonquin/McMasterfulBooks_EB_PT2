import { InMemoryWarehouse } from './warehouse/in_memory_warehouse.js';
let warehouse = null;
export function getWarehouse() {
    if (!warehouse) {
        warehouse = new InMemoryWarehouse();
    }
    return warehouse;
}
