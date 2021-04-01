const express = require('express');
const mysql = require('mysql');
const router = express.Router();
const connectionPool = require('../database/connection-pool');

/* POST */
router.post('/', function (req, res) {
  console.log('POST BODY', req.body);

  connectionPool.getPool().query('insert into library set ?', req.body, (err, result) => {
    if (err) throw err;

    console.log(result);
  });
})

/* GET */
router.get('/:id', function (req, res) {
  console.log('ID', req.params.id);
  res.sendStatus(200);
});

/* PUT */
router.put('/:id', function (req, res) {
  console.log('PUT BODY', req.body);
  res.sendStatus(200);
});

/* DELETE */
router.put('/:id', function (req, res) {
  console.log('ID', req.params.id);
  res.sendStatus(200);
});

module.exports = router;