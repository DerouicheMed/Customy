const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const routes = require("./routes/routes");
//const middlewares = require('./middlewares');

const app = express();
const port = process.env.PORT || 5000;
const path = process.env.APP_ROOT;

app.use(cors());
app.use(express.json());
app.use(path, routes);

const uri = process.env.MONGO_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true }
);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

//app.use(middlewares.notFound);
//app.use(middlewares.errorHandler);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});