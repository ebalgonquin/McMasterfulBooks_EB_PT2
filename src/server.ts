import Koa from 'koa';
import cors from '@koa/cors';
import bodyParser from 'koa-bodyparser';
import qs from 'koa-qs';
import listRouter from './books/lists';
//import bookRoutes from './books/book_routes';

const app = new Koa();
qs(app);

app.use(cors());
app.use(bodyParser());
app.use(listRouter.routes());
app.use(listRouter.allowedMethods());
//app.use(bookRoutes.allowedMethods());
//app.use(bookRoutes.routes());

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});