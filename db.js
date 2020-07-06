const mongoose = require('mongoose');
require('express-async-errors');
require('dotenv').config();
const mongodbErrors = require('mongoose-mongodb-errors');

mongoose.plugin(mongodbErrors);

mongoose.connect(process.env.mongouri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on('connected', () => {
  console.log('mongodb connected');
});

mongoose.connection.on('error', (err) => {
  console.log('ERROR: ', err);
});
