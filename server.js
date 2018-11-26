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

app.use(morgan("common"));
app.use(express.json());


app.use("/tasks", taskRouter);
app.use("/weekly", weeeklyGoalRouter);
app.use("/quarterly", quarterlyGoalRouter);
app.use("/stretch", stretchGoalRouter);
app.use("/daily", dailyRouter);
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


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
