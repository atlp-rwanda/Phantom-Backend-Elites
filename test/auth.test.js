import newSet from "./setup";
import mocha from 'mocha';
import Role from '../sequelize/models/role'
import User from '../sequelize/models/User'
import { adminMock } from './mock/userMocks';
const {
    it, describe, beforeEach, afterEach,
  } = mocha;

describe('Auth tests', async () => {

  let token

  before(async ()=> {
      const userData = await newSet.chai.request(newSet.app).post('/api/v1/auth/login').send(adminMock);
      token = `Bearer ${userData.body.token}`;
  })
  
  

  it(`It should return a sucessfully login message`, () => {
    newSet.chai
      .request(newSet.app)
      .post("/api/v1/auth/login")
      .send(adminMock)
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

  it('Should log user out successfully', async () => {
    console.log(token)
    const res = await newSet.chai
    .request(newSet.app)
    .post('/api/v1/auth/logout')
    .set('authorization', token)

    newSet.expect(res.status).to.be.equal(200)
    newSet.expect(res.body).to.have.property('message', 'Logged out successfully!')
    
  });
});
