const axios =require ("axios");
const {updateStockCache}= require ("../models/stockCache");


async function seed() {
  const response = await axios.get("http://warehouse-api:3002/api/stock");
  const stockList = response.data;

  for (const item of stockList) {
    await updateStockCache(item.bookId, item.totalStock);
  }

  console.log("Books API cache seeded");
}

seed();
