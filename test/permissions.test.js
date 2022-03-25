import setup from './setup'
import { adminMock } from './mock/userMocks';
describe('Permissions Tests', async () => {

    let token
    before(async ()=> {
        const userData = await setup.chai.request(setup.app).post('/api/v1/auth/login').send(adminMock);
        token = `Bearer ${userData.body.token}`;
    })

    it ('Admin should not create a permission without permission-name', async () => {

        const res = await setup.chai
          .request(setup.app)
          .post('/api/v1/permissions')
          .send({assignedId:1})
          .set('authorization', token);
        setup.expect(res.status).to.be.equal(400);
        setup.expect(res.body).to.have.property('name', '"name" is required');
      });

      it ('Admin should not create a permission without assignedId of the corresponding role', async () => {
        const res = await setup.chai
          .request(setup.app)
          .post('/api/v1/permissions')
          .send({name:'create'})
          .set('authorization', token);
        setup.expect(res.status).to.be.equal(400);
        setup.expect(res.body).to.have.property('assignedId', '"assignedId" is required');
      });

    it ('Should Update a permission as Admin', async () => {

      const res= await setup.chai
      .request(setup.app)
      .post('/api/v1/permissions')
      .send({ name: 'crud operation' })
      .set('authorization', token)
    console.log(`
    
    ${res.body.data.id}
    
    `)
        const res1= await setup.chai
          .request(setup.app)
          .put(`/api/v1/permissions/${res.body.data.id}`)
          .send({ name: 'Assign roles' })
          .set('authorization', token);
        setup.expect(res1.status).to.be.equal(200);
        setup.expect(res1.body).to.have.property('message', 'Role was updated successfully.');
      
      });


    //   it ('Should not Update a role as Admin', async () => {
    
    //     const res1= await setup.chai
    //       .request(setup.app)
    //       .put(`/api/v1/roles/3`)
    //       .send()
    //       .set('authorization', token);
    //     setup.expect(res1.status).to.be.equal(400);
    //     setup.expect(res1.body).to.have.property('name', '"name" is required');
      
    //   });


    // it ('Should Delete  a role as Admin', async () => {
    // const id=3
    //     const res1 =  await setup.chai
    //       .request(setup.app)
    //       .delete(`/api/v1/roles/${id}`)
    //       .set('authorization', token);
    //     setup.expect(res1.status).to.be.equal(200);
    //     setup.expect(res1.body).to.have.property('message', 'Role was deleted successfully!');
    //   });

    //   it ('Should Get a specific role as Admin', async () => {

    //     const res = await setup.chai
    //     .request(setup.app)
    //     .get(`/api/v1/roles/2`)
    //     .set('authorization', token);
    //     setup.expect(res.status).to.be.equal(200);
    //     setup.expect(res.body).to.have.key('data');
    //   });

    //   it ('Should not Get unavailable role as Admin', async () => {

    //     const res = await setup.chai
    //     .request(setup.app)
    //     .get(`/api/v1/roles/hello`)
    //     .set('authorization', token);
    //     setup.expect(res.status).to.be.equal(500);
    //     setup.expect(res.body).to.have.keys('message');
    //   });

    
    // it ('Should Get all roles as Admin', async () => {

    //     const res = await setup.chai
    //     .request(setup.app)
    //     .get('/api/v1/roles')
    //     .set('authorization', token);
    //     setup.expect(res.status).to.be.equal(200);
    //     setup.expect(res.body).to.have.keys('message', 'data');
    //   });

    //   it ('Should not Get all roles as Admin', async () => {

    //     const res = await setup.chai
    //     .request(setup.app)
    //     .get('/api/v1/roles')
    //     .set('authorizations', token);
    //     setup.expect(res.status).to.be.equal(401);
    //     setup.expect(res.body).to.have.keys('message');
    //   });

    it.only('Should Register new permissions as Admin', async () => {
          const res= await setup.chai
            .request(setup.app)
            .post('/api/v1/permissions')
            .send({ assignedId:1, name: 'create' })
            .set('authorization', token)
            console.log(res)
            setup.expect(res.status).to.be.equal(201);
            setup.expect(res.body).to.have.keys('message','data');
        });
    })