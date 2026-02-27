import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import Router from '@koa/router'
import { RegisterRoutes } from './build/routes.js'
import { getDatabaseState } from './src/database_access.js'

export default async function server(port: number, useInMemory: boolean) {
  const app = new Koa()
  const router = new Router()

  // 1. Create the database state (Step 6)
  const state = await getDatabaseState(
    useInMemory ? undefined : undefined // test mode uses random DB names
  )

  // 2. Attach DB state to Koa context
  app.use(async (ctx, next) => {
    ctx.state = state
    await next()
  })

  app.use(bodyParser())

  RegisterRoutes(router)

  app.use(router.routes())
  app.use(router.allowedMethods())

  const instance = app.listen(port)

  return { server: instance, state }
}