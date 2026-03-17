const db = require("../database");

async function updateBookInfo(book) {
  await db.query(
    `INSERT INTO book_info_cache (book_id, title, author)
     VALUES ($1, $2, $3)
     ON CONFLICT (book_id) DO UPDATE SET title = $2, author = $3`,
    [book.id, book.title, book.author]
  );
}

async function getBookInfo(bookId) {
  const result = await db.query(
    `SELECT * FROM book_info_cache WHERE book_id = $1`,
    [bookId]
  );
  return result.rows[0] ?? null;
}

module.exports = { updateBookInfo, getBookInfo };