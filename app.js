const express = require('express');

// Set up the express app
const app = express();

const indexRouter = require('./server/api/index');
const validationRouter = require('./server/api/validation');
const registrationRouter = require('./server/api/registration');
const didRouter = require('./server/api/dids');

const swaggerDoc = require('./swaggerDoc');

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: false })); // for parsing application/x-www-form-urlencoded

app.use('/', indexRouter);
app.use('/api/v1/validation', validationRouter);
app.use('/api/v1/registration', registrationRouter);
app.use('/api/v1/dids', didRouter);

swaggerDoc(app);

module.exports = app;