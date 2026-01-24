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
   const data = ctx.request.body as any;
  const result = await books.insertOne(data);

  ctx.body = result;
});

// Updated book updates
router.put('/books', async (ctx) => {
  const books = await getCollection();
   const data = ctx.request.body as any;

  const result = await books.updateOne(
    { _id: new ObjectId(ctx.params.id) },
    { $set: data }
  );


  ctx.body = result;
});

//Delet books new 
 router.delete('/books', async(ctx)=> {
  const books= await getCollection();
  const results= await books.deleteOne ({_id: new ObjectId(ctx.params.id)});
  ctx.body=results;
 })

export default router;
