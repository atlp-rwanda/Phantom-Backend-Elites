// import chai from "chai";
// import chaiHttp from "chai-http";
// import app from "../src/server.js";

// import { chai, chaiHttp, app } from "./setup.test";
import newSet from "./setup";

describe(`Home route`, () => {
  it(`Should provide welcome message.`, (done) => {
    newSet.chai
      .request(newSet.app)
      .get("/")
      .end((err, response) => {
        response.should.have.status(200);
        response.body.should.be.a("object");
        response.body.should.have.property("status");
        response.body.should.have.property("data");
        newSet
          .expect(response.body.data)
          .to.equals("Welcome to phantom app backend side");
        done();
      });
  });
  after(function (done) {
    process.exit();
  });
});
