'use strict';
require('dotenv').config();
const chai = require('chai');
const chaiHttp = require('chai-http');
const faker = require('faker');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const {User} = require('../users');
const {JWT_SECRET} = require('../config');
const should = chai.should();

const {
  Daily
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
function seedDailyData() {
  console.info('seeding daily data');
  const seedData = [];
  for (let i = 1; i <= 10; i++) {
    seedData.push({
      created: Date.now(),
      answer1: faker.lorem.sentence(),
      answer2: faker.lorem.sentence(),
      answer3: faker.lorem.sentence()
    });
  }
  // this will return a promise
  return Daily.insertMany(seedData);
}

//Server
describe('daily API resource', function() {
  const username = 'exampleUser';
  const password = 'examplePass';
  const firstName = 'Example';
  const lastName = 'User';

  before(function() {
    return runServer(TEST_DATABASE_URL);
  });

  beforeEach(function() {
    return
    User.hashPassword(password).then(password =>
      User.create({
        username,
        password,
        firstName,
        lastName
      })
    );
    seedDailyData();
  });

  afterEach(function() {
    return
    User.remove({});
    tearDownDb();
  });

  after(function() {
    return closeServer();
  });

//Get Request Test
describe('GET endpoint', function () {

   it('should return all existing daily', function () {
     it('Should reject requests with no credentials', function() {
       return chai
         .request(app)
         .get('/daily')
         .then(() =>
           expect.fail(null, null, 'Request should not succeed')
         )
         .catch(err => {
           if (err instanceof chai.AssertionError) {
             throw err;
           }

           const res = err.response;
           expect(res).to.have.status(401);
         });
     });

     it('Should reject requests with an invalid token', function() {
       const token = jwt.sign(
         {
           username,
           firstName,
           lastName
         },
         'wrongSecret',
         {
           algorithm: 'HS256',
           expiresIn: '7d'
         }
       );

       return chai
         .request(app)
         .get('/daily')
         .set('Authorization', `Bearer ${token}`)
         .then(() =>
           expect.fail(null, null, 'Request should not succeed')
         )
         .catch(err => {
           if (err instanceof chai.AssertionError) {
             throw err;
           }

           const res = err.response;
           expect(res).to.have.status(401);
         });
     });

     it('Should reject requests with an expired token', function() {
       const token = jwt.sign(
         {
           user: {
             username,
             firstName,
             lastName
           },
           exp: Math.floor(Date.now() / 1000) - 10 // Expired ten seconds ago
         },
         JWT_SECRET,
         {
           algorithm: 'HS256',
           subject: username
         }
       );

       return chai
         .request(app)
         .get('/daily')
         .set('authorization', `Bearer ${token}`)
         .then(() =>
           expect.fail(null, null, 'Request should not succeed')
         )
         .catch(err => {
           if (err instanceof chai.AssertionError) {
             throw err;
           }

           const res = err.response;
           expect(res).to.have.status(401);
         });
     });



     let res;
     const token = jwt.sign(
        {
          user: {
            username,
            firstName,
            lastName
          }
        },
        JWT_SECRET,
        {
          algorithm: 'HS256',
          subject: username,
          expiresIn: '7d'
        }
      );
     return chai
       .request(app)
       .get('/daily')
       .set('authorization', `Bearer ${token}`)
       .then(_res => {
         res = _res;
         res.should.have.status(200);

         res.body.should.have.lengthOf.at.least(1);

         return Daily.count();
       })
       .then(count => {

         res.body.should.have.lengthOf(count);
       });
   });

   it('should return daily with right fields', function () {

     let resDaily;
     return chai.request(app)
       .get('/daily')
       .then(function (res) {

         res.should.have.status(200);
         res.should.be.json;
         res.body.should.be.a('array');
         res.body.should.have.lengthOf.at.least(1);

         res.body.forEach(function (daily) {
           daily.should.be.a('object');
           daily.should.include.keys('id', 'created', 'answer1', 'answer2', 'answer3');
         });

         resDaily = res.body[0];
         return Daily.findById(resDaily.id);
       })
       .then(daily => {
         resDaily.answer1.should.equal(daily.answer1);
         resDaily.answer2.should.equal(daily.answer2);
         resDaily.answer3.should.equal(daily.answer3);
       });
   });
 });

//Still need to figure out update of due
//POST Test
 describe('POST endpoint', function () {

   it('should add a new daily daily', function () {

     const newDaily = {
       answer1: faker.lorem.sentence(),
       answer2: faker.lorem.sentence(),
       answer3: faker.lorem.sentence()
     };

     return chai.request(app)
       .post('/daily')
       .send(newDaily)
       .then(function (res) {
         res.should.have.status(201);
         res.should.be.json;
         res.body.should.be.a('object');
         res.body.should.include.keys(
           'id', 'created', 'answer1', 'answer2', 'answer3');
         res.body.id.should.not.be.null;
         return Daily.findById(res.body.id);
       })
       .then(function (daily) {
         daily.answer1.should.equal(newDaily.answer1);
         daily.answer2.should.equal(newDaily.answer2);
         daily.answer3.should.equal(newDaily.answer3);
       });
   });
 });

 describe('PUT endpoint', function () {

   it('should update fields you send over', function () {
     const updateData = {
       answer1: faker.lorem.sentence(),
       answer2: faker.lorem.sentence(),
       answer3: faker.lorem.sentence()
       }
     });

     return Daily
       .findOne()
       .then(daily => {
         updateData.id = daily.id;

         return chai.request(app)
           .put(`/daily/${daily.id}`)
           .send(updateData);
       })
       .then(res => {
         res.should.have.status(204);
         return Daily.findById(updateData.id);
       })
       .then(daily => {
         daily.answer1.should.equal(updateData.answer1);
         daily.answer2.should.equal(updateData.answer2);
         daily.answer3.should.equal(updateData.answer3);
       });
   });


 describe('DELETE endpoint', function () {

   it('should delete a daily by id', function () {

     let daily;

     return Daily
       .findOne()
       .then(_daily => {
         daily = _daily;
         return chai.request(app).delete(`/daily/${daily.id}`);
       })
       .then(res => {
         res.should.have.status(204);
         return Daily.findById(daily.id);
       })
       .then(_daily => {

         should.not.exist(_daily);
       });
   });
 });


});
