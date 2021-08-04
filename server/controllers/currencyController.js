const currencyApiKey = '1ffa62edcf0ab7a273524c03abf11876';
const { query } = require('../models/postgresModel.js');
const pool = require('../models/postgresModel.js'); 
//currency key from exchanges rates API. Good until 8/31/2021.
const fetch = require('node-fetch');

// https://api.exchangeratesapi.io/v1/convert
// ? access_key = API_KEY
// & from = GBP
// & to = JPY
// & amount = 1

const currencyController = {};

currencyController.setCookie = async (req, res, next) => {
  try {
    const { id, token } = req.body
    // if don't exist, add user
    // if exist, update access token
    // place in db
    pool.query(`INSERT INTO user_table(user_id, amt_usd, fav_rates, base_currency, token)
      VALUES('${id}', 0, 'ARRAY ${[]}', 1, '${token}') 
      ON CONFLICT (user_id) DO UPDATE SET token = '${token}'`)
      .catch(err => {
        console.log('err in setCookie', err)
      })
    // send cookie back to user
    res.cookie('token', token, { maxAge: 1800000});
    // set cookie for id as well
    res.cookie('idCookie', id);
  } catch (err) {
    return next('Error found in setCookie', err)
  }
}

currencyController.checkCookie = async (req, res, next) => {
  try {
    const { token, id } = req.cookies
    if(!token) {
      res.locals.foundCookie = false
      return next()
    } else {
      pool.query(`SELECT * FROM user_table WHERE user_id = ${id}`, (err, data) => {
        if(err) {
          console.log('error in checkCookie') 
          return next(err);
        } 
        //token matches
        if (data.rows[0].token === token) {
          res.locals.foundCookie = true;
          return next();
          //token does not match
        }
        res.locals.foundCookie = false;
        return next();
      })
    }
  } catch(err) {
    return next('Error found in checkCookie', err)
  }

}


///old stuff
currencyController.getRate = async (req, res, next) => {
  try {
    const { curr1, curr2 } = req.body;
    const result = await fetch(
      `https://api.exchangeratesapi.io/v1/convert?access_key=${currencyApiKey}&from=${curr1}&to=${curr2}&amount=1`
    );
    const json = await result.json();
    res.locals.rate = json;
    return next();
  } catch (err) {
    return next(err);
  }
};

currencyController.getHistory = async (req, res, next) => {
  const now = new Date();
  const today = now.toISOString().slice(0, 10);
  const aMonthAgo = new Date(new Date().setDate(now.getDate() - 30))
    .toISOString()
    .slice(0, 10);

  try {
    const { curr1, curr2 } = req.body;
    const result = await fetch(
      `https://api.exchangeratesapi.io/v1/timeseries?access_key=${currencyApiKey}&start_date=${aMonthAgo}&end_date=${today}&base=${curr1}&symbols=${curr2}`
    );
    const json = await result.json();
    res.locals.rate.history = json.rates;
    return next();
  } catch (err) {
    return next(err);
  }
};

module.exports = currencyController;
