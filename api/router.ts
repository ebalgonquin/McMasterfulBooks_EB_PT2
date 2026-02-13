import Router from '@koa/router'
import type { Middleware } from 'koa'

export interface RouteDefinition {
  method?: 'get' | 'post' | 'put' | 'delete'
  path?: string
  handler: Middleware
}

export class ZodRouter {
  private router: any   // <-- the fix

  constructor() {
    this.router = new Router()
  }

  register(def: RouteDefinition): void {
    const method = def.method ?? 'get'
    const path = def.path ?? '/'
    this.router[method](path, def.handler)
  }

  routes(): Middleware {
    return this.router.routes()
  }

  allowedMethods(): Middleware {
    return this.router.allowedMethods()
  }
}

export default ZodRouter