const express = require('express');

const FormRoute = require('./form.route');
const StudyRoute = require('./study.route');

const app = express();

app.use('/form',FormRoute);
app.use('/study',StudyRoute);

module.exports = app;