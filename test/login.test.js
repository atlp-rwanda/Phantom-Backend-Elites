import newSet from "./setup.js";


describe(`Home route`, () => {
  
 
  
  it(`It should return a sucessfully login message`, () => {
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
          .to.equals('A token for your session has been saved!')
        
      });   
  });
  it(`It should return unsucessfully login message for incorrect password`, () => {
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
      });
  });
  it(`It should return unsucessfully login`, () => {
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
       
      });
  });
});
