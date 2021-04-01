const express = require('express');
const mysql = require('mysql');
const router = express.Router();
const connectionPool = require('../database/connection-pool');

/* GET users listing. */
router.get('/', function (req, res, next) {

  const book = {
    'author': 'Charles Dickens',
    'title': 'Great Expectations',
    'published': '1861-01-01'
  }

  connectionPool.getPool().query('insert into library set ?', book, (err, result) => {
    if (err) throw err;

    console.log(result);
  });

  res.send('Books found here.');
});

module.exports = router;