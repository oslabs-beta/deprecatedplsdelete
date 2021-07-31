const mongoose = require('mongoose');
const { Schema } = mongoose;


const MONGO_URI = '' // fill in with db string after created


mongoose
  .connect(MONGO_URI, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
    dbName: "" //fill in with name of database
  });

const currencySchema = new Schema()






module.exports = mongoose.model('', currencySchema); // first param is collection name in DB