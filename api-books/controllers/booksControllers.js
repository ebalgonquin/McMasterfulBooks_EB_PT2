const { publishBookAdded } = require("../messaging/publish");

async function createBook(req, res) {
  const newBook = await BookModel.create(req.body);


  await publishBookAdded({
    id: newBook.id,
    title: newBook.title,
    author: newBook.author
  });

  res.status(201).json(newBook);
}

module.exports = { createBook };