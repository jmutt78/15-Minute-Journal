'use strict';

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

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

const QuarterlyGoal = mongoose.model('QuarterlyGoal', quarterlyGoalSchema);
const WeeklyGoal = mongoose.model('WeeklyGoal', weelyGoalSchema);
const Tasks = mongoose.model('Tasks', taskSchema);

module.exports = {Tasks, WeeklyGoal, QuarterlyGoal};
