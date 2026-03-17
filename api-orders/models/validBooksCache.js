const db = require("../database");

async function addValidBook(bookId) {
  await db.query(
    `INSERT INTO valid_books_cache (book_id)
     VALUES ($1)
     ON CONFLICT (book_id) DO NOTHING`,
    [bookId]
  );
}

async function isValidBook(bookId) {
  const result = await db.query(
    `SELECT book_id FROM valid_books_cache WHERE book_id = $1`,
    [bookId]
  );
  return result.rows.length > 0;
}

module.exports = { addValidBook, isValidBook };