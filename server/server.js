const express = require('express');
const app = express();
const path = require('path');
const currencyApi = require('./routes/currencyApi')


const PORT = 3000 // may need to change ML


app.use(express.urlencoded({ extended: true }));
app.use(express.json()); //bodyParser deprecatd ML

app.use(express.static(path.join(__dirname, '../' ))); //serves the index.html

// define route handlers
app.use('/currencyApi', currencyApi);





/**
 * 404 handler
 */
 app.use('*', (req,res) => {
  res.status(404).send('Not Found');
});

/**
 * Global error handler
 */
app.use((err, req, res, next) => {
  res.status(500).send('Internal Server Error');
});



app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`); // just to test
});

module.exports = app;
