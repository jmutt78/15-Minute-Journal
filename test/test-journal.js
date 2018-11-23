'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
const faker = require('faker');
const mongoose = require('mongoose');


const should = chai.should();

const {
  Journal
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
function seedJournalData() {
  console.info('seeding journal data');
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
  return Journal.insertMany(seedData);
}

//Server
describe('journal API resource', function() {

  before(function() {
    return runServer(TEST_DATABASE_URL);
  });

  beforeEach(function() {
    return seedJournalData();
  });

  afterEach(function() {
    return tearDownDb();
  });

  after(function() {
    return closeServer();
  });

//Get Request Test
describe('GET endpoint', function () {

   it('should return all existing journal', function () {

     let res;
     return chai.request(app)
       .get('/journal')
       .then(_res => {
         res = _res;
         res.should.have.status(200);

         res.body.should.have.lengthOf.at.least(1);

         return Journal.count();
       })
       .then(count => {

         res.body.should.have.lengthOf(count);
       });
   });

   it('should return journal with right fields', function () {

     let resJournal;
     return chai.request(app)
       .get('/journal')
       .then(function (res) {

         res.should.have.status(200);
         res.should.be.json;
         res.body.should.be.a('array');
         res.body.should.have.lengthOf.at.least(1);

         res.body.forEach(function (journal) {
           journal.should.be.a('object');
           journal.should.include.keys('id', 'created', 'answer1', 'answer2', 'answer3');
         });

         resJournal = res.body[0];
         return Journal.findById(resJournal.id);
       })
       .then(journal => {
         resJournal.answer1.should.equal(journal.answer1);
         resJournal.answer2.should.equal(journal.answer2);
         resJournal.answer3.should.equal(journal.answer3);
       });
   });
 });

//Still need to figure out update of due
//POST Test
 describe('POST endpoint', function () {

   it('should add a new journal journal', function () {

     const newJournal = {
       answer1: faker.lorem.sentence(),
       answer2: faker.lorem.sentence(),
       answer3: faker.lorem.sentence()
     };

     return chai.request(app)
       .post('/journal')
       .send(newJournal)
       .then(function (res) {
         res.should.have.status(201);
         res.should.be.json;
         res.body.should.be.a('object');
         res.body.should.include.keys(
           'id', 'created', 'answer1', 'answer2', 'answer3');
         res.body.id.should.not.be.null;
         return Journal.findById(res.body.id);
       })
       .then(function (journal) {
         journal.answer1.should.equal(newJournal.answer1);
         journal.answer2.should.equal(newJournal.answer2);
         journal.answer3.should.equal(newJournal.answer3);
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

     return Journal
       .findOne()
       .then(journal => {
         updateData.id = journal.id;

         return chai.request(app)
           .put(`/journal/${journal.id}`)
           .send(updateData);
       })
       .then(res => {
         res.should.have.status(204);
         return Journal.findById(updateData.id);
       })
       .then(journal => {
         journal.answer1.should.equal(updateData.answer1);
         journal.answer2.should.equal(updateData.answer2);
         journal.answer3.should.equal(updateData.answer3);
       });
   });


 describe('DELETE endpoint', function () {

   it('should delete a journal by id', function () {

     let journal;

     return Journal
       .findOne()
       .then(_journal => {
         journal = _journal;
         return chai.request(app).delete(`/journal/${journal.id}`);
       })
       .then(res => {
         res.should.have.status(204);
         return Journal.findById(journal.id);
       })
       .then(_journal => {

         should.not.exist(_journal);
       });
   });
 });


});
