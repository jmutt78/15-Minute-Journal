const chai = require("chai");
const chaiHttp = require("chai-http");

const expect = chai.expect;

const { app, runServer, closeServer } = require("../server");

chai.use(chaiHttp);

describe("Tasks", function() {
  before(function() {
    return runServer();
  });

  after(function() {
    return closeServer();
  });

//GET
  it("should list items on GET", function() {
    return chai
      .request(app)
      .get("/tasks")
      .then(function(res) {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.be.a("array");
        expect(res.body.length).to.be.above(0);
        res.body.forEach(function(item) {
          expect(item).to.be.a("object");
          expect(item).to.have.all.keys(
            "id",
            "text",
            "created",
            "due"
          );
        });
      });
  });

//POST
  it("should add a task on POST", function() {
    const newTask = {
      text: "Lorem ip some",
      due: 43388
    };
    const expectedKeys = ["id", "created"].concat(Object.keys(newTask));

    return chai
      .request(app)
      .post("/tasks")
      .send(newPost)
      .then(function(res) {
        expect(res).to.have.status(201);
        expect(res).to.be.json;
        expect(res.body).to.be.a("object");
        expect(res.body).to.have.all.keys(expectedKeys);
        expect(res.body.title).to.equal(newTask.title);
        expect(res.body.content).to.equal(newTask.content);
        expect(res.body.author).to.equal(newTask.author);
      });
  });

  it("should error if POST missing expected values", function() {
    const badRequestData = {};
    return chai
      .request(app)
      .post("/tasks")
      .send(badRequestData)
      .then(function(res) {
        expect(res).to.have.status(400);
      });
  });
//PUT
  it("should update blog posts on PUT", function() {
    return (
      chai
        .request(app)
        // first have to get
        .get("/tasks")
        .then(function(res) {
          const updatedTask = Object.assign(res.body[0], {
            text: "connect the dots",
            due: 43389
          });
          return chai
            .request(app)
            .put(`/tasks/${res.body[0].id}`)
            .send(updatedTask)
            .then(function(res) {
              expect(res).to.have.status(204);
            });
        })
    );
  });
//DELETE
  it("should delete task on DELETE", function() {
    return (
      chai
        .request(app)
        // first have to get
        .get("/tasks")
        .then(function(res) {
          return chai
            .request(app)
            .delete(`/tasks/${res.body[0].id}`)
            .then(function(res) {
              expect(res).to.have.status(204);
            });
        })
    );
  });
});
