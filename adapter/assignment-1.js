let books = [
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
async function listBooks(filters) {
    // Assignment 1 does NOT apply filters — just return everything
    return books;
}
async function createOrUpdateBook(book) {
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
async function removeBook(id) {
    books = books.filter(b => b.id !== id);
}
const assignment = "assignment-1";
export default {
    assignment,
    listBooks,
    createOrUpdateBook,
    removeBook
};
