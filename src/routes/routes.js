const express = require('express');

const FormRoute = require('./form.route');
const StudyRoute = require('./study.route');
const QuestionRoute = require('./question.route');

const app = express();

app.use('/form',FormRoute);
app.use('/study',StudyRoute);
app.use('/question',QuestionRoute);

module.exports = app;