export interface Book {
  id?: string;
  name: string;
  author: string;
  description: string;
  price: number;
  image: string;
}
let books: Book[] = [
  {
    id: "1",
    name: "Sample Book",
    author: "Author A",
    description: "Demo",
    price: 15,
    image: "none"
  }
];

let nextId = 2;
async function listBooks(filters?: Array<{ from?: number; to?: number }>): Promise<Book[]> {
  // Assignment 1 does NOT apply filters — just return everything
  return books;
}


async function createOrUpdateBook(book: Book): Promise<string> {
  if (book.id) {
    // Update existing book
    const index = books.findIndex(b => b.id === book.id);
    if (index !== -1) {
      books[index] = { ...books[index], ...book };
      return book.id;
    }
  }

  // Create new book
  const id = String(nextId++);
  books.push({ ...book, id });
  return id;
}

async function removeBook(id: string): Promise<void> {
  books = books.filter(b => b.id !== id);
}

const assignment = "assignment-1";

export default {
  assignment,
  listBooks,
  createOrUpdateBook,
  removeBook
};