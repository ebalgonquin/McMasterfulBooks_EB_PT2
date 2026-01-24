import Router from '@koa/router';
import listRouter from './lists';
import { MongoClient, ObjectId } from "mongodb";


//new adding in
const client = new MongoClient("mongodb://mongo:27017");

async function getCollection() {
 
  await client.connect();
const db=client.db("bookstore");
return db.collection("books");
}

const router = new Router();

// List books route (implemented) - use routes from lists.ts
router.use(listRouter.routes());
router.use(listRouter.allowedMethods());

// Create book route updated
router.post('/books', async (ctx) => {
  const books = await getCollection();
  const result = await books.insertOne(ctx.request.body);
  ctx.body = result;
});

// Update book route (not yet implemented)
router.put('/books/:id', async (ctx) => {
  ctx.status = 501;
  ctx.body = { error: 'Update book not yet implemented' };
});

export default router;
