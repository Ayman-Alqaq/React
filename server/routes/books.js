const express = require('express');
const mysql = require('mysql');
const router = express.Router();
const connectionPool = require('../database/connection-pool');

const BookRepository = require('../database/book-repository');

let repository = new BookRepository(connectionPool);

/* GET (Single Book) */
router.get('/:id', function (req, res) {
  repository.get(req.params.id, (err, result) => {
    if (err) {
      res.status(500).json({ 'error': err.toString() });
    }
    else {
      res.status(200).json(result);
    }
  });
})

/* GET (ALL Books) */
router.get('/', function (req, res) {
  repository.getAll((err, result) => {
    if (err) {
      res.status(500).json({ 'error': err.toString() });
    }
    else {
      res.status(200).json(result);
    }
  });
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

/* DELETE (Delete a book) */ 
router.delete('/:id', function (req, res) {
  repository.delete(req.params.id, (err, result) => {
    if (err) {
      res.status(500).json({ 'error': err.toString() });
    }
    else {
      res.sendStatus(200);
    }
  });
})

/* POST (Save the book) */
router.post('/', function (req, res) {
  console.log(req.body);
  repository.save(req.body, (err, result) => {
    if (err) {
      res.status(500).json({ 'error': err.toString() });
    }
    else {
      res.sendStatus(200);
    }
  });
})



module.exports = router;