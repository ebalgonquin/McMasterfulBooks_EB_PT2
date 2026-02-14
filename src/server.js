import Koa from 'koa';
import cors from '@koa/cors';
import bodyParser from 'koa-bodyparser';
import qs from 'koa-qs';
import ZodRouter from '../api/router.js';
import listBooksRoute from './books/lists.js';
import lookupBookByIdRoute from './books/lookup.js';
const app = new Koa();
const router = new ZodRouter();
qs(app);
app.use(cors());
app.use(bodyParser());
// Register your routes
listBooksRoute(router);
lookupBookByIdRoute(router);
// Attach router middleware
app.use(router.routes());
app.use(router.allowedMethods());
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
