const express = require("express");
const stockRoutes = require("../routes/stock");

const app = express();
app.use(express.json());

app.use("/api", stockRoutes);

app.listen(3002, () => {
  console.log("Warehouse API running on port 3002");
});