import { Route, Get, Path, Request } from 'tsoa'
import { Request as KoaRequest } from 'koa'

@Route('hello')
export class HelloRoute {
  @Get('{name}')
  public async sayHello(
    @Path() name: string,
    @Request() request: KoaRequest
  ): Promise<string> {
    return `Hello ${name}`
  }
}