import newSet from "./setup";

describe('Home route', () => {

  let token ;
  it('It should return sucessfully login message', (done) => {
    const user = {
      email: "admin@admin.com",
      password: "admin"
    }
    newSet.chai
      .request(newSet.app)
      .post("/api/v1/auth/login")
      .send(user)
      .end((err, response) => {
        console.log(response.body)
        token = response.body.token;
        response.should.have.status(200);
        response.body.should.have.property("message");
        newSet
          .expect(response.body.message)
        done();
      });
  });
  
  
  it('It should return unsucessfully login message for incorrect password', (done) => {
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
  it('It should return unsucessfully login', (done) => {
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
  it('It should return invalid email error', (done) => {
    const user = {
      email: "",
      password: "admin"
    }
    newSet.chai
      .request(newSet.app)
      .post("/api/v1/auth/login")
      .send(user)
      .end((err, response) => {
        response.should.have.status(400);
        response.body.should.have.property("email");
        newSet
          .expect(response.body.message);
        done();
      });
  });
  it('It should return that firstname is not allowed be empty', (done) => {
    const user = {
      firstName: "",
      lastName: "Moise",
      email: "moiseniyonkuru1@gmail.com",
      roleId: 1,
      dateofbirth:"2020-1-1",
      gender: "male",
      address:"kigali"
    }
   
    newSet.chai
      .request(newSet.app)
      .post("/api/v1/users/")      
      .send(user)
      .end((err, response) => {
        response.should.have.status(400);
        response.body.should.have.property("firstName");
        done();
      });
  });
  it('invalid email should be be detected', (done) => {
    const user = {
      firstName: "Jane",
      lastName: "jannet",
      email: "jane1gmail.com",
      roleId: 1,
      dateofbirth:"2020-1-1",
      gender: "male",
      address:"kigali"
    }
    newSet.chai
      .request(newSet.app)
      .post("/api/v1/users/")
      .send(user)
      .end((err, response) => {
        response.should.have.status(400);
        response.body.should.have.property("email");
        newSet
          .expect(response.body.email)
          .to.equals('"email" must be a valid email');
        done();
      });
  });
  it('User should be registered', (done) => {
    const user = {
      firstName: "Jane",
      lastName: "jannet",
      email: "nkrmoise@gmail.com",
      roleId: 1,
      dateofbirth:"2020-1-1",
      gender: "male",
      address:"kigali"
    }
    newSet.chai
      .request(newSet.app)
      .post("/api/v1/users/")
      .set({ "authorization": `Bearer ${token}` })
      .send(user)
      .end((err, response) => {
        console.log(response.body)
        response.should.have.status(200);
        newSet
          .expect(response.body.message)
        done();
      });
  });
  after(function (done) {
    process.exit();
  });
});
