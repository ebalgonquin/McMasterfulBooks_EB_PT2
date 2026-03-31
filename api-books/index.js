const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Books API running");
});

// --- RabbitMQ temporarily disabled for Docker testing ---
// const { subscribe } = require("./messaging/subscribe");
// const { updateStockCache } = require("./models/stockCache");

// subscribe("BookStocked", async (event) => {
//   await updateStockCache(event.bookId, event.amount);
// });

// --- Publishing disabled too ---
// const { connect } = require("./messaging/rabbit");
// async function publishBookAdded(book) {
//   const channel = await connect();
//   const queue = "book-added";

//   await channel.assertQueue(queue);
//   channel.sendToQueue(queue, Buffer.from(JSON.stringify(book)));

//   console.log("Published BookAdded event:", book);
// }

app.listen(3001, () => console.log("Books API on 3001"));