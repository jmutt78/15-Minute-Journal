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



function seedTaskData() {
  console.info('seeding task data');
  const seedData = [];
  for (let i = 1; i <= 10; i++) {
    seedData.push({
      text: faker.lorem.sentence(),
      due: faker.date.future(2)
    });
  }
  // this will return a promise
  return Tasks.insertMany(seedData);
}


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

  describe('GET endpoint', function() {

    it('should return all existing tasks', function() {

      let res;
      return chai.request(app)
        .get('/tasks')
        .then(_res => {
          res = _res;
          res.should.have.status(200);
          // otherwise our db seeding didn't work
          res.body.should.have.lengthOf.at.least(1);

          return Tasks.count();
        })
        .then(count => {

          res.body.should.have.lengthOf(count);
        });
    });
  });



});
