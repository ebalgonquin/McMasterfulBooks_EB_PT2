const axios = require("axios");
const { addValidBook } = require("../models/validBooksCache");

async function seed() {
  const response = await axios.get("http://books-api:3001/api/books");
  const books = response.data;

  for (const book of books) {
    await addValidBook(book.id);
  }

  console.log("Orders API cache seeded");
}

seed();