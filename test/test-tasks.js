'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
const faker = require('faker');
const mongoose = require('mongoose');


const should = chai.should();

const {
  Tasks
} = require('../models');
const {
  closeServer,
  runServer,
  app
} = require('../server');
const {
  TEST_DATABASE_URL
} = require('../config');

chai.use(chaiHttp);


function tearDownDb() {
  return new Promise((resolve, reject) => {
    console.warn('Deleting database');
    mongoose.connection.dropDatabase()
      .then(result => resolve(result))
      .catch(err => reject(err));
  });
}


//Seed the data
function seedTaskData() {
  console.info('seeding task data');
  const seedData = [];
  for (let i = 1; i <= 10; i++) {
    seedData.push({
      text: faker.lorem.sentence(),
      due: 43389,
    });
  }
  // this will return a promise
  return Tasks.insertMany(seedData);
}

//Server
describe('task API resource', function() {

  before(function() {
    return runServer(TEST_DATABASE_URL);
  });

  beforeEach(function() {
    return seedTaskData();
  });

  afterEach(function() {
    return tearDownDb();
  });

  after(function() {
    return closeServer();
  });

//Get Request Test
describe('GET endpoint', function () {

   it('should return all existing tasks', function () {

     let res;
     return chai.request(app)
       .get('/tasks')
       .then(_res => {
         res = _res;
         res.should.have.status(200);

         res.body.should.have.lengthOf.at.least(1);

         return Tasks.count();
       })
       .then(count => {

         res.body.should.have.lengthOf(count);
       });
   });

   it('should return tasks with right fields', function () {

     let resTask;
     return chai.request(app)
       .get('/tasks')
       .then(function (res) {

         res.should.have.status(200);
         res.should.be.json;
         res.body.should.be.a('array');
         res.body.should.have.lengthOf.at.least(1);

         res.body.forEach(function (task) {
           task.should.be.a('object');
           task.should.include.keys('id', 'text', 'due', 'created');
         });

         resTask = res.body[0];
         return Tasks.findById(resTask.id);
       })
       .then(task => {
         resTask.text.should.equal(task.text);
         resTask.due.should.equal(task.due);
       });
   });
 });

});
