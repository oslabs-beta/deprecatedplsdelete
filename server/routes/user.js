const express = require('express');

const currencyController = require('../controllers/currencyController');

const router = express.Router();

const databaseController = require('../controllers/databaseController');

// router.get to API
router.post('/add', databaseController.addQueryData, (req, res) => {
    res.status(200).send(res.locals.rate);
  }
);

module.exports = router;