class BookRepository {
    constructor(connectionPool) {
        this.connectionPool = connectionPool;
    }

    save(book, callback) {
        this.connectionPool.getPool().query('insert into library set ?', book, callback);
        //throw new Error('Something bad happened.');
    }

    get(id) {

    }

    getAll() {

    }

    update(id, book) {

    }

    delete() {

    }
}

module.exports = BookRepository;
