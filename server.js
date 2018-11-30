"use strict";

const express = require("express");
const morgan = require("morgan");
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const { DATABASE_URL, PORT } = require('./config');
const taskRouter = require("./taskRouter");
const weeeklyGoalRouter = require("./weeklyGoalRouter");
const quarterlyGoalRouter = require("./quarterlyGoalRouter");
const stretchGoalRouter = require("./stretchGoalRouter");
const dailyRouter = require("./dailyRouter");
const app = express();
const cors = require('cors');

app.use(morgan("common"));
app.use(express.json());
app.all("/api/*", function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Cache-Control, Pragma, Origin, Authorization, Content-Type, X-Requested-With");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST");
  return next();
});
app.use(cors());
app.use("/tasks", taskRouter);
app.use("/weekly", weeeklyGoalRouter);
app.use("/quarterly", quarterlyGoalRouter);
app.use("/stretch", stretchGoalRouter);
app.use("/daily", dailyRouter);

let server;


function runServer(databaseUrl, port = PORT) {
  return new Promise((resolve, reject) => {
    mongoose.connect(databaseUrl, err => {
      if (err) {
        return reject(err);
      }
      server = app.listen(port, () => {
        console.log(`Your app is listening on port ${port}`);
        resolve();
      })
        .on('error', err => {
          mongoose.disconnect();
          reject(err);
        });
    });
  });
}

function closeServer() {
  return mongoose.disconnect().then(() => {
    return new Promise((resolve, reject) => {
      console.log('Closing server');
      server.close(err => {
        if (err) {
          return reject(err);
        }
        resolve();
      });
    });
  });
}

if (require.main === module) {
  runServer(DATABASE_URL).catch(err => console.error(err));
}

module.exports = { runServer, app, closeServer };
