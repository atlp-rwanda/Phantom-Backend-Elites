import newSet from "./setup.js";

describe.only(`Home route`, () => {
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

  it(`It should return user`, (done) => {
    const user = {
      email: "admin@test.com",
      password: "admin"
    }
    newSet.chai
      .request(newSet.app)
      .post("/api/v1/signin")
      .send(user)
      .end((err, response) => {
        response.should.have.status(404);
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


  after(function (done) {
    process.exit();
  });
});
