class BookRepository {
    constructor(connectionPool) {
        this.connectionPool = connectionPool;
    }

    save(book) {
        this.connectionPool.getPool().query('insert into library set ?', book, (err, result) => {
            if (err) throw err;

            console.log(result);
        });
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
