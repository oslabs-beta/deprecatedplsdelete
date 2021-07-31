const mongoose = require('mongoose');
const { Schema } = mongoose;


const MONGO_URI = '' // fill in with db string after created


mongoose
  .connect(MONGO_URI, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
    dbName: "" //fill in with name of database
  });

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  history: { type: currencySchema }
});



const currencySchema = new Schema ({
  currency : [historySchema]
})

const historySchema = new Schema({
  date: String,
  rate: Number,
})


module.exports = mongoose.model('', userSchema); // first param is collection name in DB