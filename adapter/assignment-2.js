import assignment1 from "./assignment-1";
;
async function listBooks(filters) {
    return assignment1.listBooks(filters);
}
async function createOrUpdateBook(book) {
    return assignment1.createOrUpdateBook(book);
}
async function removeBook(book) {
    return assignment1.removeBook(book);
}
const assignment = "assignment-2";
export default {
    assignment,
    createOrUpdateBook,
    removeBook,
    listBooks
};
