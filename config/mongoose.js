// require the library
const mongoose = require("mongoose");

// connect to database
mongoose.connect("mongodb://localhost/contacts_list_db");

//acquire the connection to check if it is uccessful
const db = mongoose.connection;

//errr
db.on('error',console.error.bind(console,'error conneccting to db'));

//up and running then print the message
db.once('open',function(){
  console.log('successfully connected to the database');
});

