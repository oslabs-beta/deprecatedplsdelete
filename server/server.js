const express = require('express');
const path = require('path');
const currencyApi = require('./routes/currencyApi');
const cors = require('cors');
const currencyController = require('./controllers/currencyController');
const dotenv = require('dotenv');
dotenv.config({path: path.resolve(__dirname, '../config.env' )})
const cookie = require('cookie');
const cookieParser = require('cookie-parser');

const app = express();
app.use(cookieParser())

app.use(express.urlencoded({ extended: true }));
app.use(express.json()); //bodyParser deprecatd ML
app.use(express.static(path.join(__dirname, '../'))); //serves the index.html

app.use(cors());
// define route handlers
app.use('/currencyApi', currencyApi);

app.post('/auth/google', currencyController.setCookie, (req, res) => {
  return res.status(200).redirect('/');
})

// oops did u think any of the buttons below worked lol
app.get('/login', (req, res) => {
  res.status(200).render(path.join(__dirname, '../client/Login.jsx'));
});

app.get('/signup', (req, res) => {
  res.render('../client/Signup.jsx');
});

app.post('/signup', databaseController.createUser, (req, res) => {
  res.status(200).redirect('/');
});

/**
 * 404 handler
 */
app.use('*', (req, res) => {
  res.status(404).send('Not Found');
});

/**
 * Global error handler
 */
app.use((err, req, res, next) => {
  res.status(500).send('Internal Server Error');
});

app.listen(process.env.PORT, () => {
  console.log(`Server listening on port: ${process.env.PORT}`); // just to test
});

module.exports = app;

/*

Hold value for each user of 

POSTGRES INFO

Password: 
pNpg9xHq_KEAifOWMLk0qjdO7Wto9IF8

URL:
postgres://ycmhdnyk:pNpg9xHq_KEAifOWMLk0qjdO7Wto9IF8@chunee.db.elephantsql.com/ycmhdnyk

API Key:
1293faf4-422a-4876-8061-392e318f3d57


tables below are created and submitted

CREATE TABLE [IF NOT EXISTS] user_table ( user_id VARCHAR PRIMARY KEY, amt_usd NUMERIC(30,2) NOT NULL CHECK (amt_usd >= 0.00), fav_rates SMALLINT[] NOT NULL FOREIGN KEY, base_currency SMALLINT NOT NULL FOREIGN K
 EY

assign foreign keys only after creating new tables that it will reference

still needs foreign ID of base currency 



CREATE TABLE currency_descriptions (
  currency_id SERIAL PRIMARY KEY,
  currency_name VARCHAR(50) NOT NULL,
  currency_acronym CHAR(3) NOT NULL,
  countries_used VARCHAR[] NOT NULL,
  symbol VARCHAR(1),
  );

CREATE TABLE currency_history (
  currency_history_id SERIAL PRIMARY KEY,
  currency_id int NOT NULL REFERENCES currency_descriptions,
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  exchange_rate_USD NUMERIC(20, 10) NOT NULL
);


CREATE TABLE positions (
  position_id SERIAL PRIMARY KEY,
  currency_id int NOT NULL REFERENCES currency_descriptions,
  local_value NUMERIC(30, 10) NOT NULL,
  user_id VARCHAR NOT NULL REFERENCES user_table
);
  
*/