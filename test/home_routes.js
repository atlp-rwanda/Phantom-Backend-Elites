import newSet from "./setup.js";

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
  
  it(`It should return sucessfully login message`, (done) => {
    const user = {
      email: "admin@admin.com",
      password: "admin"
    }
    newSet.chai
      .request(newSet.app)
      .post("/api/v1/auth/login")
      .send(user)
      .end((err, response) => {
        response.should.have.status(200);
        response.body.should.have.property("message");
        newSet
          .expect(response.body.message)
        done();
      });
  });
  it(`It should return unsucessfully login message for incorrect password`, (done) => {
    const user = {
      email: "admin@admin.com",
      password: "admin123456"
    }
    newSet.chai
      .request(newSet.app)
      .post("/api/v1/auth/login")
      .send(user)
      .end((err, response) => {
        response.should.have.status(200);
        response.body.should.have.property("message");
        newSet
          .expect(response.body.message)
          .to.equals('Incorrect email or password');
        done();
      });
  });
  it(`It should return unsucessfully login`, (done) => {
    const user = {
      email: "admin1@gmail.com",
      password: "admin"
    }
    newSet.chai
      .request(newSet.app)
      .post("/api/v1/auth/login")
      .send(user)
      .end((err, response) => {
        response.should.have.status(400);
        response.body.should.have.property("message");
        newSet
          .expect(response.body.message)
          .to.equals('Incorrect email or password');
        done();
      });
  });
  after(function (done) {
    process.exit();
  });
});
