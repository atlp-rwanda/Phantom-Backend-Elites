import setup from './setup'
import mocha from 'mocha';
import Role from '../sequelize/models/role'
import { adminMock } from './mock/userMocks';
const {
    it, describe, beforeEach, afterEach,
  } = mocha;

const login = async (user) => {
    const userData = await setup.chai.request(setup.app).post('/api/v1/auth/login').send(user);
    return `Bearer ${userData.body.token}`;

  };

describe('Routs tests', async () => {
  
    it('Should Register new roles as Admin', async () => {
        const token = await login(adminMock);
        const res = await setup.chai
          .request(setup.app)
          .post('/api/v1/roles')
          .send({ name: 'Testing8487534dssdsd' })
          .set('authorization', token);
        setup.expect(res.status).to.be.equal(201);
        setup.expect(res.body).to.have.keys('message', 'data');
      });
    })