'use strict';

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const taskSchema = mongoose.Schema({
  text: {type: String},
  created: {type: Date, default: Date.now},
  due: {type: Date, default: Date.now},
  completeDate: {type: Date, default: Date.now}
});


taskSchema.methods.serialize = function() {
  return {
    id: this._id,
    text: this.text,
    created: this.created,
    due: this.due,
    completeDate: this.completeDate,

  };
};

const Tasks = mongoose.model('Tasks', taskSchema);

module.exports = {Tasks};
