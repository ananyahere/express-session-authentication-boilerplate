const mongoose = require('mongoose')

// db connection
  
const dbstring = process.env.DB_STRING
const connection = mongoose.createConnection(dbstring, {
  useNewUrlParser:true,
  useUnifiedTopology: true
}, () => {
  console.log('Mongodb connected')
})

const UserSchema = new mongoose.Schema({
  username: String,
  hash: String,
  salt: String
})

const User = connection.model('User', UserSchema)

module.exports = connection

