const express = require("express");
const app = express();

app.use(express.json());

// --- RabbitMQ temporarily disabled for Docker testing ---
// const stockRoutes = require("../routes/stock");
// const { subscribe } = require("./messaging/subscribe");
// const { updateBookInfo } = require("./models/bookInfoCache");

// subscribe("BookAdded", async (event) => {
//   await updateBookInfo({
//     id: event.id,
//     title: event.title,
//     author: event.author
//   });
// });

// app.use("/api", stockRoutes);

// --- Minimal API route so the service still responds ---
app.get("/", (req, res) => {
  res.send("Warehouse API running");
});

app.listen(3002, () => {
  console.log("Warehouse API running on port 3002");
});