const express = require('express');
const path = require('path');
const currencyApi = require('./routes/currencyApi');
const userRouter = require('./routes/user');
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
app.use('/user', userRouter);

app.post('/auth/google', currencyController.setCookie, (req, res) => {
  return res.status(200).redirect('/');
})

// oops did u think any of the buttons below worked lol
app.get('/login', (req, res) => {
  res.status(200).render(path.join(__dirname, '../client/Login.jsx'));
});

app.get('/signup', (req, res) => {
  res.render('../client/Signup.jsx'); //ILLEGAL in react no?
});

app.post('/user/addPort', currencyController.getCurrencyId, currencyController.addPortfolio, (req, res) => {
  return res.status(200).send('Added to portfolio!');
})

// app.post('/signup', databaseController.createUser, (req, res) => {
//   res.status(200).redirect('/'); //ILLEGAL in react no?
// });

app.get('/user/getPort', currencyController.getPortfolio, (req, res) => {
 return res.status(200).json(res.locals.portfolio)

})

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
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(process.env.PORT, () => {
  console.log(`Server listening on port: ${process.env.PORT}`); // just to test
});

module.exports = app;
