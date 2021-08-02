const { experiments } = require('webpack');
const User = require('../models/currencyModel');

// const { Species, Planet, Film, Person} = require('../models/starWarsModels');

const databaseController = {};

// create user -- create
databaseController.createUser = async (req, res, next) => {
  // console.log('Success entering createUser middleware');
  try {
    const newUser = await User.create({username: 'Shawn11', password: 'isrocking10'});
    return next();
  } catch (err) {
    return next(err);
  };
}

// login user -- findOne
databaseController.userLogin = async (req, res, next) => {
  try {
    const { username, password } = req.body
    const loginUser = await User.findOne({username: username, password: password});
    if (!loginUser) console.log('Wrong password, dummy.');
    else console.log('You did it!');
    return next();
  }
  catch (err) {
    return next(err);
  }
}

// addQueryData -- when the user makes a post request add an instance of request to the database

databaseController.addQueryData = async (req, res, next) => {
  console.log('entered AddQuery')
  const now = new Date();
  const today = now.toISOString().slice(0 ,16)
  console.log('TODAY IS', today);
  console.log('RES LOCALS RATE IS', res.locals.rate.result)
  try {
    await User.updateOne({username: 'Shawn11'}, { $push: { history: {currency: 'GBPJPY', date: today, rate: res.locals.rate.result} }});
    return next();
  }
  catch (err) {
    return next(err);
  }
  
}


// getQueryData -- when the user logs in return the array of timestamps

databaseController.getQueryData = async (req, res, next) => {
  console.log('entered getQuery');
  try {
    const queryData = await User.findOne({username: 'Shawn11'}, 'history')
    res.locals.personalHistory = queryData.history;
    console.log(res.locals.personalHistory)
    return next()
  }
  catch (err) {
    return next(err);
  }
}

// // getTime 
// databaseController.getTime = async (req, res, next) => {
//   try {
//     History.create({date: Date.now(), rate: 0});
//     return next();
//   } catch (err) {
//     return next(err);
//   }
// }

module.exports = databaseController;