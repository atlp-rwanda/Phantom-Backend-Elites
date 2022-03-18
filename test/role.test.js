import setup from './setup'
import { adminMock } from './mock/userMocks';


const login = async (user) => {
    const userData = await setup.chai.request(setup.app).post('/api/v1/auth/login').send(user);
    return `Bearer ${userData.body.token}`;

  };
 
  

describe('Roles Tests', async () => {
    it('Admin should not create a role without role-name', async () => {
      const token = await login(adminMock)
        const res = await setup.chai
          .request(setup.app)
          .post('/api/v1/roles')
          .send({})
          .set('authorization', token);
        setup.expect(res.status).to.be.equal(400);
        setup.expect(res.body).to.have.keys('message');
      });

    it('Should Update a role as Admin', async () => {
        const token = await login(adminMock)
        let res =  await setup.chai
          .request(setup.app)
          .post('/api/v1/roles')
          .send({ name: 'operations' })
          .set('authorization', token);

          console.log(`
          
          
          This is the id that you are looking for
          
          ${res.body.data.id}
          
          thank you!`
          )
    
        const res1= await setup.chai
          .request(setup.app)
          .put(`/api/v1/roles/${res.body.data.id}`)
          .send({ name: 'operationss' })
          .set('authorization', token);
        setup.expect(res1.status).to.be.equal(200);
        setup.expect(res1.body).to.have.property('message', 'Role was updated successfully.');
      
      });


      it('Should Delete  a role as Admin', async () => {
        const token = await login(adminMock);
    
        const res = await setup.chai
          .request(setup.app)
          .post('/api/v1/roles')
          .send({ name: 'driver' })
          .set('authorization', token);
    
        const res1 =  await setup.chai
          .request(setup.app)
          .delete(`/api/v1/roles/${res.body.data.id}`)
          .set('authorization', token);
        setup.expect(res1.status).to.be.equal(200);
        setup.expect(res1.body).to.have.property('message', 'Role was deleted successfully!');
      
      });
    
      it('Should Get all roles as Admin', async () => {
        const token = await login(adminMock)
        const res = await setup.chai
        .request(setup.app)
        .get('/api/v1/roles')
        .set('authorization', token);
        setup.expect(res.status).to.be.equal(200);
        setup.expect(res.body).to.have.keys('message', 'data');
       
      });

      it('Should Register new roles as Admin', async () => {
        const token = await login(adminMock)  
          const res= await setup.chai
            .request(setup.app)
            .post('/api/v1/roles')
            .send({ name: 'operator' })
            .set('authorization', token)
            setup.expect(res.status).to.be.equal(201);
            setup.expect(res.body).to.have.keys('message','data');
            
        });
    })