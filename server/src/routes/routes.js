const express = require('express');

const FormRoute = require('./form.route');
const StudyRoute = require('./study.route');
const QuestionRoute = require('./question.route');
const ResponseRoute = require('./response.route');
const UserRoute = require('./user.route');
const UserResponseRoute = require('./user_response.route');
const GroupRoute = require('./group.route');

const app = express();

app.use('/form',FormRoute);
app.use('/study',StudyRoute);
app.use('/question',QuestionRoute);
app.use('/response',ResponseRoute);
app.use('/user',UserRoute);
app.use('/group',GroupRoute);
app.use('/userresponse',UserResponseRoute);

module.exports = app;