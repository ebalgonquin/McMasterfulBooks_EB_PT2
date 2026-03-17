const express = require("express");
const orderRoutes = require("./routes/orders");

const app = express();
app.use(express.json());
const { subscribe } = require("./messaging/subscribe");
const { addValidBook } = require("./models/validBooksCache");

subscribe("BookAdded", async (event) => {
  await addValidBook(event.id);
});
app.use("/api", orderRoutes);

app.listen(3003, () => {
  console.log("Orders API running on port 3003");
});