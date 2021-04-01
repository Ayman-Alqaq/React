class BookRepository {
    constructor(connectionPool) {
        this.connectionPool = connectionPool;
    }

    get pool() {
        return this.connectionPool.getPool();
    }

    save(book, callback) {
        this.pool.query('insert into library set ?', book, callback);
        //throw new Error('Something bad happened.');
    }

    get(id) {

    }

    getAll() {

    }

    update(id, book, callback) {
        // Perform a transaction to make sure ID exists before executing
        this.pool.query('update library set ? where id =?', [book, id], callback);
    }

    delete() {

    }
}

module.exports = BookRepository;
