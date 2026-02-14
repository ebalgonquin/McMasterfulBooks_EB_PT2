import previous_assignment from './assignment-2';
;
;
// If multiple filters are provided, any book that matches at least one of them should be returned
// Within a single filter, a book would need to match all the given conditions
async function listBooks(filters = []) {
    const allBooks = await previous_assignment.listBooks();
    //no filter get everything
    // No filters → return everything
    if (!filters || filters.length === 0) {
        return allBooks;
    }
    return allBooks.filter(book => filters.some(filter => {
        const matchesFrom = filter.from === undefined || book.price >= filter.from;
        const matchesTo = filter.to === undefined || book.price <= filter.to;
        const matchesName = filter.name === undefined ||
            book.name.toLowerCase().includes(filter.name.toLowerCase());
        const matchesAuthor = filter.author === undefined ||
            book.author.toLowerCase().includes(filter.author.toLowerCase());
        return matchesFrom && matchesTo && matchesName && matchesAuthor;
    }));
}
async function createOrUpdateBook(book) {
    return await previous_assignment.createOrUpdateBook(book);
}
async function removeBook(book) {
    await previous_assignment.removeBook(book);
}
const assignment = 'assignment-3';
export default {
    assignment,
    createOrUpdateBook,
    removeBook,
    listBooks
};
