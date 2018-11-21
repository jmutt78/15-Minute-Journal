'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
const faker = require('faker');
const mongoose = require('mongoose');


const should = chai.should();

const {
  QuarterlyGoal
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
function seedGoalData() {
  console.info('seeding goal data');
  const seedData = [];
  for (let i = 1; i <= 10; i++) {
    seedData.push({
      text: faker.lorem.sentence(),
      completed: true,
    });
  }
  // this will return a promise
  return QuarterlyGoal.insertMany(seedData);
}

//Server
describe('goal API resource', function() {

  before(function() {
    return runServer(TEST_DATABASE_URL);
  });

  beforeEach(function() {
    return seedGoalData();
  });

  afterEach(function() {
    return tearDownDb();
  });

  after(function() {
    return closeServer();
  });

//Get Request Test
describe('GET endpoint', function () {

   it('should return all existing goals', function () {

     let res;
     return chai.request(app)
       .get('/quarterly')
       .then(_res => {
         res = _res;
         res.should.have.status(200);

         res.body.should.have.lengthOf.at.least(1);

         return QuarterlyGoal.count();
       })
       .then(count => {

         res.body.should.have.lengthOf(count);
       });
   });

   it('should return goals with right fields', function () {

     let resGoal;
     return chai.request(app)
       .get('/quarterly')
       .then(function (res) {

         res.should.have.status(200);
         res.should.be.json;
         res.body.should.be.a('array');
         res.body.should.have.lengthOf.at.least(1);

         res.body.forEach(function (goal) {
           goal.should.be.a('object');
           goal.should.include.keys('id', 'text', 'created', 'completed');
         });

         resGoal = res.body[0];
         return QuarterlyGoal.findById(resGoal.id);
       })
       .then(goal => {
         resGoal.text.should.equal(goal.text);
         resGoal.completed.should.equal(goal.completed);
       });
   });
 });

//Still need to figure out update of due
//POST Test
 describe('POST endpoint', function () {

   it('should add a new goal goal', function () {

     const newGoal = {
       text: faker.lorem.sentence(),
     };

     return chai.request(app)
       .post('/quarterly')
       .send(newGoal)
       .then(function (res) {
         res.should.have.status(201);
         res.should.be.json;
         res.body.should.be.a('object');
         res.body.should.include.keys(
           'id', 'text', 'created', 'completed');
         res.body.text.should.equal(newGoal.text);
         res.body.id.should.not.be.null;
         return QuarterlyGoal.findById(res.body.id);
       })
       .then(function (goal) {
         goal.text.should.equal(newGoal.text);
       });
   });
 });

 describe('PUT endpoint', function () {

   it('should update fields you send over', function () {
     const updateData = {
       text: faker.lorem.sentence(),
       completed: true
       }
     });

     return QuarterlyGoal
       .findOne()
       .then(goal => {
         updateData.id = goal.id;

         return chai.request(app)
           .put(`/quarterly/${goal.id}`)
           .send(updateData);
       })
       .then(res => {
         res.should.have.status(204);
         return QuarterlyGoal.findById(updateData.id);
       })
       .then(goal => {
         goal.text.should.equal(updateData.text);
         goal.completed.should.equal(updateData.completed);
       });
   });


 describe('DELETE endpoint', function () {

   it('should delete a goal by id', function () {

     let goal;

     return QuarterlyGoal
       .findOne()
       .then(_goal => {
         goal = _goal;
         return chai.request(app).delete(`/quarterly/${goal.id}`);
       })
       .then(res => {
         res.should.have.status(204);
         return QuarterlyGoal.findById(goal.id);
       })
       .then(_goal => {

         should.not.exist(_goal);
       });
   });
 });


});
