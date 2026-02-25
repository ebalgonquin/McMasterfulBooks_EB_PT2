import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import Router from '@koa/router'
import { RegisterRoutes } from './build/routes.js'

export default async function server(port: number, useInMemory: boolean) {
  const app = new Koa()
  const router = new Router()

  app.use(bodyParser())

  RegisterRoutes(router)

  app.use(router.routes())
  app.use(router.allowedMethods())

  const instance = app.listen(port)

  // placeholder until DB is implemented
  const state = {}

  return { server: instance, state }
}