import Router from '@koa/router';
import { MongoClient, ObjectId } from "mongodb";

// MongoDB connection
const client = new MongoClient("mongodb://mongo:27017");

async function getCollection() {
  await client.connect();
  const db = client.db("bookstore");
  return db.collection("books");
}

const router = new Router();

// REMOVE STATIC LIST ROUTES
// router.use(listRouter.routes());
// router.use(listRouter.allowedMethods());

// GET all books (MongoDB)
router.get('/books', async (ctx) => {
  const books = await getCollection();
  const result = await books.find().toArray();
  ctx.body = result;
});

// CREATE a book
router.post('/books', async (ctx) => {
  const books = await getCollection();
  const data = ctx.request.body as any;
  const result = await books.insertOne(data);
  ctx.body = result;
});

// UPDATE a book
router.put('/books/:id', async (ctx) => {
  const books = await getCollection();
  const data = ctx.request.body as any;

  const result = await books.updateOne(
    { _id: new ObjectId(ctx.params.id) },
    { $set: data }
  );

  ctx.body = result;
});

// DELETE a book
router.delete('/books/:id', async (ctx) => {
  const books = await getCollection();
  const result = await books.deleteOne({ _id: new ObjectId(ctx.params.id) });
  ctx.body = result;
});

export default router;