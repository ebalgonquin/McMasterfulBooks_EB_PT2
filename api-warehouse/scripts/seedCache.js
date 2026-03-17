const axios = require("axios");
const { updateBookInfo } = require("../models/bookInfoCache");

async function seed() {
  const response = await axios.get("http://books-api:3001/api/books");
  const books = response.data;

  for (const book of books) {
    await updateBookInfo(book);
  }

  console.log("Warehouse API cache seeded");
}

seed();