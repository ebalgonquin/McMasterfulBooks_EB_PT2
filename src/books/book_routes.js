//import Router from '@koa/router';
//import { MongoClient, ObjectId } from "mongodb";
//import { Context } from "koa";
export {};
//interface Book {
//title: string;
//author: string;
//year: number;
//}
// MongoDB connection commenting out for assignment 3 requirements
//const client = new MongoClient("mongodb://mongo:27017");
//async function getCollection() {
//await client.connect();
//const db = client.db("bookstore");
//return db.collection("books");
//}
//const router = new Router();
// REMOVE STATIC LIST ROUTES
// router.use(listRouter.routes());
// router.use(listRouter.allowedMethods());
// GET all books (MongoDB)
//router.get('/books', async (ctx: Context) => {
//const books = await getCollection();
// const result = await books.find().toArray();
//ctx.body = result;
//});
// CREATE a book
//router.post('/books', async (ctx: Context) => {
//const books = await getCollection();
//const data =ctx.request.body as Book;
//const result = await books.insertOne(data);
//ctx.body = result;
//});
// UPDATE a book
//router.put('/books/:id', async (ctx:Context) => {
//const books = await getCollection();
//const data = ctx.request.body as Book;
//const result = await books.updateOne(
//{ _id: new ObjectId(ctx.params.id) },
//{ $set: data }
//);
//ctx.body = result;
//});
// DELETE a book
//router.delete('/books/:id', async (ctx:Context) => {
//const books = await getCollection();
//const result = await books.deleteOne({ _id: new ObjectId(ctx.params.id) });
//ctx.body = result;
//});
//export default router;
