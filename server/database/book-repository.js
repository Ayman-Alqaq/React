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

    get(id, callback) {
        this.pool.query('select * from library where id = ?', id, callback);
    }

    getAll(callback) {
        this.pool.query('select * from library', callback);
    }

    update(id, book, callback) {
        // Perform a transaction to make sure ID exists before executing
        this.pool.query('update library set ? where id =?', [book, id], callback);
    }

    delete(id, callback) {
        this.pool.query('delete from library where id = ?', id, callback);
    }
}

module.exports = BookRepository;
