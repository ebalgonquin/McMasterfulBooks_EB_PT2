import { InMemoryWarehouse } from './warehouse/in_memory_warehouse.js'
import type { WarehouseData } from './warehouse/warehouse_data.js'

let warehouse: WarehouseData | null = null

export function getWarehouse(): WarehouseData {
  if (!warehouse) {
    warehouse = new InMemoryWarehouse()
  }
  return warehouse
}