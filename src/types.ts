// src/types.ts

export type BookID = string

export interface Book {
  id: BookID            // MUST be required
  name: string
  author: string
  description: string
  price: number
  image: string
  stock: number         // MUST be required once warehouse is integrated
}

export interface Filter {
  from?: number
  to?: number
  name?: string
  author?: string
}

export type ShelfId = string
export type OrderId = string