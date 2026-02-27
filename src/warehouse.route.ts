import { Route, Post, Body } from 'tsoa'
import { IsArray, ArrayMinSize, ValidateNested, IsNumber } from 'class-validator'
import { Type } from 'class-transformer'
import { BookID, OrderId } from './types.js'

class OrderItem {
  bookId!: BookID

  @IsNumber()
  quantity!: number
}

class PlaceOrderRequest {
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => OrderItem)
  items!: OrderItem[]
}

/**
 * @summary Place an order in the warehouse
 * @description Accepts a list of items and returns an OrderId
 */
@Route('warehouse')
export class WarehouseRoutes {
  @Post('orders')
  public async placeOrder(
    @Body() _order: PlaceOrderRequest
  ): Promise<OrderId> {
    throw new Error('not implemented')
  }
}