const chai = require("chai");
const app = require("../dist/server.js").default;
const chaiHttp = require("chai-http");

let expect = chai.expect;
chai.should();
chai.use(chaiHttp);

describe(`Home route`, () => {
  it(`Should provide welcome message.`, (done) => {
    chai
      .request(app)
      .get("/")
      .end((err, response) => {
        response.should.have.status(200);
        response.body.should.be.a("object");
        response.body.should.have.property("status");
        response.body.should.have.property("data");
        done();
      });
  });
});
