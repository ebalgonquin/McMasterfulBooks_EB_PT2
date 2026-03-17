const express= require ("express")
const app =express();

app.get("/",(req,res)=>{
    res.send("Books API running");

});
const { subscribe } = require("./messaging/subscribe");
const { updateStockCache } = require("./models/stockCache");

subscribe("BookStocked", async (event) => {
  await updateStockCache(event.bookId, event.amount);
});

app.listen(3001, ()=> console.log("Books API on 3001"));
const { connect } = require("../messaging/rabbit");

async function publishBookAdded(book) {
  const channel = await connect();
  const queue = "book-added";

  await channel.assertQueue(queue);
  channel.sendToQueue(queue, Buffer.from(JSON.stringify(book)));

  console.log("Published BookAdded event:", book);
}
