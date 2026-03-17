const {Pool} =require ("pg");

const pool = new Pool({
    host:"books-db",
    user: "books",
    password:"books",
    database:"booksdb",
    port: 5432
});

module.exports = pool;