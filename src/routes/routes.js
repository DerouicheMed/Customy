const express = require('express');

const FormRoute = require('./form.route');
const StudyRoute = require('./study.route');
const QuestionRoute = require('./question.route');
const ResponseRoute = require('./response.route');

const app = express();

app.use('/form',FormRoute);
app.use('/study',StudyRoute);
app.use('/question',QuestionRoute);
app.use('/response',ResponseRoute);

module.exports = app;