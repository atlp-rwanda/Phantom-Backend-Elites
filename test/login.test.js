import { adminMock, nonRegisteredUserData, registeredUserWrongCredentials } from "./mock/userMocks.js";
import newSet from "./setup.js";

describe('Login API', () => {
  // Testing login end-point
  describe('api/v1/auth/login', () => {
    it('A registered user should be able to login', (done) => {
      newSet.chai
        .request(newSet.app)
        .post('/api/v1/auth/login')
        .send(adminMock)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('token');
          res.body.should.have.property('message');
          res.body.should.have.property('user');
          newSet
          .expect(res.body.message)
          .to.equals('Login Successfully')
          done();
        });
    });
    it('A registered user shouldnot be able to login with wrong credentials', (done) => {
      newSet.chai
        .request(newSet.app)
        .post('/api/v1/auth/login')
        .send(registeredUserWrongCredentials)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.be.a('object');
          res.body.should.have.property('message');
          newSet
          .expect(res.body.message)
          .to.equals('Incorrect email or password')
          done();
        });
    });
  });
});
