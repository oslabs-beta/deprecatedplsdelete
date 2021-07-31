const express = require('express');

const currencyController = require('../controllers/currencyController');

const router = express.Router();



// router.get to API
router.get('/', currencyController.getRate, currencyController.getHistory, (req, res) => {
    res.status(200).send(res.locals);
})






module.exports = router;