const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const mongoose = require('mongoose');
const errorHandler = require('./core/errorHandler');
const code = require('./config/code');

// [CONFIGURE APP TO USE bodyParser]
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const port = process.env.PORT || 8080;

const mongoDB = 'mongodb://127.0.0.1/fc';
mongoose.connect(mongoDB, { useNewUrlParser: true });
const DB = mongoose.connection;
DB.on('error', console.error.bind(console, 'MongoDB connection error:'));

require('./models/Products');

app.use(require('./routes'));

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(errorHandler.createError(code.ERROR_CODE.NOT_FOUND));
});

app.listen(port, () => {
  console.log(`Cache App is listening on port ${port}`);
});
