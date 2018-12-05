'use strict';

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
//Task schema
const taskSchema = mongoose.Schema({
  text: {type: String},
  created: {type: Number, default: Date.now},
  due: {type: Number, default: Date.now()},
  completed: {type: Boolean, default: false},
});


taskSchema.methods.serialize = function() {
  return {
    id: this._id,
    text: this.text,
    created: this.created,
    due: this.due,
    completed: this.completed,
  };
};
//weekly goal schema
const weelyGoalSchema = mongoose.Schema({
  text: {type: String},
  created: {type: Number, default: Date.now},
  completed: {type: Boolean, default: false},
});


weelyGoalSchema.methods.serialize = function() {
  return {
    id: this._id,
    text: this.text,
    created: this.created,
    completed: this.completed,
  };
};
//quarterly goal schema
const quarterlyGoalSchema = mongoose.Schema({
  text: {type: String},
  created: {type: Number, default: Date.now},
  completed: {type: Boolean, default: false},
});


quarterlyGoalSchema.methods.serialize = function() {
  return {
    id: this._id,
    text: this.text,
    created: this.created,
    completed: this.completed,
  };
};
//stretch goal schema
const stretchGoalSchema = mongoose.Schema({
  text: {type: String},
  created: {type: Number, default: Date.now},
  completed: {type: Boolean, default: false},
});


stretchGoalSchema.methods.serialize = function() {
  return {
    id: this._id,
    text: this.text,
    created: this.created,
    completed: this.completed,
  };
};
//journal schema
const dailySchema = mongoose.Schema({
    created: {type: Date, default: Date.now},
    answer1: {type: String},
    answer2: {type: String},
    answer3: {type: String},
});


dailySchema.methods.serialize = function() {
  return {
    id: this._id,
    created: this.created,
    answer1: this.answer1,
    answer2: this.answer2,
    answer3: this.answer3,
  };
};

const Daily = mongoose.model('Daily', dailySchema);
const StretchGoal = mongoose.model('StretchGoal', stretchGoalSchema);
const QuarterlyGoal = mongoose.model('QuarterlyGoal', quarterlyGoalSchema);
const WeeklyGoal = mongoose.model('WeeklyGoal', weelyGoalSchema);
const Tasks = mongoose.model('Tasks', taskSchema);

module.exports = {Tasks, WeeklyGoal, QuarterlyGoal, StretchGoal, Daily};
