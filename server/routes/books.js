const express = require('express');
const mysql = require('mysql');
const router = express.Router();
const connectionPool = require('../database/connection-pool');

const BookRepository = require('../database/book-repository');

let repository = new BookRepository(connectionPool);

/* POST (Save the book) */
router.post('/', function (req, res) {
  //console.log('POST BODY', req.body);

  repository.save(req.body, (err, result) => {
    //If SQL Query Fails
    if (err) {
      res.status(500).json({ 'error': err.toString() });
    } else {
      res.sendStatus(200);
    }
  });
})

/* GET */
router.get('/:id', function (req, res) {
  console.log('ID', req.params.id);
  res.sendStatus(200);
});

/* PUT (Update a book)*/
router.put('/:id', function (req, res) {
  repository.update(req.params.id, req.body, (err, result) => {
    if (err) {
      res.status(500).json({ 'error': err.toString() });
    }
    else {
      res.sendStatus(200);
    }
  });
})

/* DELETE */
router.put('/:id', function (req, res) {
  console.log('ID', req.params.id);
  res.sendStatus(200);
});

module.exports = router;