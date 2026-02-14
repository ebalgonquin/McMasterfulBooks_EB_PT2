import previous_assignment from './assignment-3.js';
;
;
// If multiple filters are provided, any book that matches at least one of them should be returned
// Within a single filter, a book would need to match all the given conditions
async function listBooks(filters) {
    throw new Error("Todo");
}
async function createOrUpdateBook(book) {
    return await previous_assignment.createOrUpdateBook(book);
}
async function removeBook(book) {
    await previous_assignment.removeBook(book);
}
async function placeBooksOnShelf(bookId, numberOfBooks, shelf) {
    throw new Error("Todo");
}
async function orderBooks(order) {
    throw new Error("Todo");
}
async function findBookOnShelf(book) {
    throw new Error("Todo");
}
async function fulfilOrder(order, booksFulfilled) {
    throw new Error("Todo");
}
async function listOrders() {
    throw new Error("Todo");
}
const assignment = 'assignment-4';
export default {
    assignment,
    createOrUpdateBook,
    removeBook,
    listBooks,
    placeBooksOnShelf,
    orderBooks,
    findBookOnShelf,
    fulfilOrder,
    listOrders
};
