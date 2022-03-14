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
  

describe('Roles Tests', async () => {
  const token =  await login(adminMock);
  
    it('Should Register new roles as Admin', async () => {
      console.log(token)
        const res= await setup.chai
          .request(setup.app)
          .post('/api/v1/roles')
          .send({ name:'operator' })
          .set('authorization', token)
          setup.expect(res.status).to.be.equal(200);
          setup.expect(res.body).to.have.keys('message','data');
      });

    it('Admin should not create a role without name', async (done) => {
        const res =  await setup.chai
          .request(setup.app)
          .post('/api/v1/roles')
          .send({})
          .set('authorization', token);
        setup.expect(res.status).to.be.equal(400);
        setup.expect(res.body).to.have.keys('message');
        done()
      });

      it('Should Update a role as Admin', async (done) => {
        const res =  await setup.chai
          .request(setup.app)
          .post('/api/v1/roles')
          .send({ name: 'operations' })
          .set('authorization', token);
    
        const res1= await setup.chai
          .request(setup.app)
          .put(`/api/v1/roles/${res.body.id}`)
          .send({ name: 'operationss' })
          .set('authorization', token);
        setup.expect(res1.status).to.be.equal(200);
        setup.expect(res1.body).to.have.property('message', 'Role was updated successfully.');
      done()
      });


      it('Should Delete  a role as Admin', async (done) => {
        const token = login(adminMock);
    
        const res = await setup.chai
          .request(setup.app)
          .post('/api/v1/roles')
          .send({ name: 'driver' })
          .set('authorization', token);
    
        const res1 =  await setup.chai
          .request(setup.app)
          .delete(`/api/v1/roles/${res.body.id}`)
          .set('authorization', token);
        setup.expect(res1.status).to.be.equal(200);
        setup.expect(res1.body).to.have.property('message', 'Role was deleted successfully!');
        done()
      });
    
      it('Should Get all roles as Admin', async (done) => {
        const res = await setup.chai
        .request(setup.app)
        .get('/api/v1/roles')
        .set('authorization', token);
        setup.expect(res.status).to.be.equal(200);
        setup.expect(res.body).to.have.keys('message', 'data');
        done()
      });
    })