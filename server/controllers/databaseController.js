const { experiments } = require('webpack');
const { User, Currency, History } = require('../models/currencyModel');

// const { Species, Planet, Film, Person} = require('../models/starWarsModels');

const databaseController = {};

// create user -- create
databaseController.createUser = async (req, res, next) => {
  // console.log('Success entering createUser middleware');
  try {
    const newUser = await User.create({username: 'Shawn1', password: 'isrocking1'});
    return next();
  } catch (err) {
    return next(err);
  };
}

// login user -- findOne
databaseController.userLogin = async (req, res, next) => {
  try {
    const loginUser = await User.findOne({username: 'Shawn', password: 'isrocking'});
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
  try {

    
  }
  catch (err) {
    return next(err);
  }
  
}


// getQueryData -- when the user logs in return the array of timestamps

// getTime 
databaseController.getTime = async (req, res, next) => {
  try {
    History.create({date: Date.now(), rate: 0});
    return next();
  } catch (err) {
    return next(err);
  }
}

module.exports = databaseController;