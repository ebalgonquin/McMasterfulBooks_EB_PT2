const express = require("express");
const app = express();

app.use(express.json());

// --- RabbitMQ temporarily disabled for Docker testing ---
// const orderRoutes = require("./routes/orders");
// const { subscribe } = require("./messaging/subscribe");
// const { addValidBook } = require("./models/validBooksCache");

// subscribe("BookAdded", async (event) => {
//   await addValidBook(event.id);
// });

// app.use("/api", orderRoutes);

// --- Minimal route so the service still responds ---
app.get("/", (req, res) => {
  res.send("Orders API running");
});

app.listen(3003, () => {
  console.log("Orders API running on port 3003");
});