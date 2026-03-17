const express = require("express");
const stockRoutes = require("../routes/stock");
const { subscribe } = require("./messaging/subscribe");
const { updateBookInfo } = require("./models/bookInfoCache");

subscribe("BookAdded", async (event) => {
  await updateBookInfo({
    id: event.id,
    title: event.title,
    author: event.author
  });
});
const app = express();
app.use(express.json());

app.use("/api", stockRoutes);

app.listen(3002, () => {
  console.log("Warehouse API running on port 3002");
});