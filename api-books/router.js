import Router from '@koa/router';
export class ZodRouter {
    router; // <-- the fix
    constructor() {
        this.router = new Router();
    }
    register(def) {
        const method = def.method ?? 'get';
        const path = def.path ?? '/';
        this.router[method](path, def.handler);
    }
    routes() {
        return this.router.routes();
    }
    allowedMethods() {
        return this.router.allowedMethods();
    }
}
export default ZodRouter;
