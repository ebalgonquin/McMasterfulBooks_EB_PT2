const db= require ("../database");

async function updateStockCache(bookId, totalStock) {
    await db.query (
        'INSERT INTO book_stock_cache (book_id, total_stock) VALUES($1, $2) ON CONFLICT(book_id) DO UPDATE SET total_stock=$2',
        [bookId, totalStock]
    );
}

async function getStockCache(bookId){
    const result= await db.query (
    'SELECT total_stock FROM book_stock_cache WHERE book_id =$1'
    [bookId]
    );
    return result.rows[0]?.total_stock ?? null;

}
module.exports = {updateStockCache, getStockCache}