const express = require('express');

const currencyController = require('../controllers/currencyController');

const router = express.Router();

const databaseController = require('../controllers/databaseController')



// router.get to API
router.get('/', currencyController.getRate, currencyController.getHistory, databaseController.createUser, databaseController.addQueryData, databaseController.getQueryData, (req, res) => {
    res.status(200).send(res.locals);
})

//Hello all//




module.exports = router;