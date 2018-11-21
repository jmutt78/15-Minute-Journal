'use strict';

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
//Task schema
const taskSchema = mongoose.Schema({
  text: {type: String},
  created: {type: Date, default: Date.now},
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
  created: {type: Date, default: Date.now},
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
  created: {type: Date, default: Date.now},
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
  created: {type: Date, default: Date.now},
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

const StretchGoal = mongoose.model('StretchGoal', stretchGoalSchema);
const QuarterlyGoal = mongoose.model('QuarterlyGoal', quarterlyGoalSchema);
const WeeklyGoal = mongoose.model('WeeklyGoal', weelyGoalSchema);
const Tasks = mongoose.model('Tasks', taskSchema);

module.exports = {Tasks, WeeklyGoal, QuarterlyGoal, StretchGoal};
