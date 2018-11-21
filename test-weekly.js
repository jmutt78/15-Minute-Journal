'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
const faker = require('faker');
const mongoose = require('mongoose');


const should = chai.should();

const {
  Goals
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
    });
  }
  // this will return a promise
  return WeeklyGoal.insertMany(seedData);
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
       .get('/weekly')
       .then(_res => {
         res = _res;
         res.should.have.status(200);

         res.body.should.have.lengthOf.at.least(1);

         return WeeklyGoal.count();
       })
       .then(count => {

         res.body.should.have.lengthOf(count);
       });
   });

   it('should return goals with right fields', function () {

     let resGoal;
     return chai.request(app)
       .get('/weekly')
       .then(function (res) {

         res.should.have.status(200);
         res.should.be.json;
         res.body.should.be.a('array');
         res.body.should.have.lengthOf.at.least(1);

         res.body.forEach(function (goal) {
           goal.should.be.a('object');
           goal.should.include.keys('id', 'text', 'due', 'created');
         });

         resGoal = res.body[0];
         return WeeklyGoal.findById(resGoal.id);
       })
       .then(goal => {
         resGoal.text.should.equal(goal.text);
         resGoal.due.should.equal(goal.due);
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
       .post('/goals')
       .send(newGoal)
       .then(function (res) {
         res.should.have.status(201);
         res.should.be.json;
         res.body.should.be.a('object');
         res.body.should.include.keys(
           'id', 'text', 'due', 'created');
         res.body.text.should.equal(newGoal.text);
         res.body.id.should.not.be.null;
         res.body.due.should.equal(newGoal.due);
         return WeeklyGoal.findById(res.body.id);
       })
       .then(function (goal) {
         goal.text.should.equal(newGoal.text);
         goal.due.should.equal(newGoal.due);
       });
   });
 });

 describe('PUT endpoint', function () {

   it('should update fields you send over', function () {
     const updateData = {
       text: faker.lorem.sentence(),
       due: faker.date.future(1)
       }
     });

     return WeeklyGoal
       .findOne()
       .then(goal => {
         updateData.id = goal.id;

         return chai.request(app)
           .put(`/weekly/${goal.id}`)
           .send(updateData);
       })
       .then(res => {
         res.should.have.status(204);
         return TaWeeklyGoalsks.findById(updateData.id);
       })
       .then(goal => {
         goal.text.should.equal(updateData.text);
       });
   });


 describe('DELETE endpoint', function () {

   it('should delete a goal by id', function () {

     let goal;

     return WeeklyGoal
       .findOne()
       .then(_goal => {
         goal = _goal;
         return chai.request(app).delete(`/weekly/${goal.id}`);
       })
       .then(res => {
         res.should.have.status(204);
         return WeeklyGoal.findById(goal.id);
       })
       .then(_goal => {
         should.not.exist(_goal);
       });
   });
 });


});
