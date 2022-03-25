import setup from './setup'
import mocha from 'mocha';
import { adminMock,
    userWithoutFirstName,
    userWithoutLastName,
    userWithoutEmail,
    userWithoutGender,
    userWithoutRole,
    userMock} from './mock/userMocks';


const login = async (user) => {
    const userData = await setup.chai.request(setup.app).post('/api/v1/auth/login').send(user);
    return `Bearer ${userData.body.token}`;

  };
  

describe('User related Tests', async () => {


    it('Admin should not create a user without firstName', async () => {
      const token = await login(adminMock)
        const res =  await setup.chai
          .request(setup.app)
          .post('/api/v1/users')
          .send(userWithoutFirstName)
          .set('authorization', token);
        setup.expect(res.status).to.be.equal(400);
        setup.expect(res.body).to.have.property('firstName', '"firstName" is required');
      });
    
    it('Admin should not create a user without lastName', async () => {
        const token = await login(adminMock)
          const res =  await setup.chai
            .request(setup.app)
            .post('/api/v1/users')
            .send(userWithoutLastName)
            .set('authorization', token);
          setup.expect(res.status).to.be.equal(400);
          setup.expect(res.body).to.have.property('lastName', '"lastName" is required');
        });
    it('Admin should not create a user without email', async () => {
            const token = await login(adminMock)
              const res =  await setup.chai
                .request(setup.app)
                .post('/api/v1/users')
                .send(userWithoutEmail)
                .set('authorization', token);
              setup.expect(res.status).to.be.equal(400);
              setup.expect(res.body).to.have.property('email', '"email" is required');
            });
    it('Admin should not create a user without gender', async () => {
        const token = await login(adminMock)
            const res =  await setup.chai
            .request(setup.app)
            .post('/api/v1/users')
            .send(userWithoutGender)
            .set('authorization', token);
            setup.expect(res.status).to.be.equal(400);
            setup.expect(res.body).to.have.property('gender', '"gender" is required');
        });
    it('Admin should not create a user without assigning him a role', async () => {
        const token = await login(adminMock)
            const res =  await setup.chai
            .request(setup.app)
            .post('/api/v1/users')
            .send(userWithoutRole)
            .set('authorization', token);
            setup.expect(res.status).to.be.equal(400);
            setup.expect(res.body).to.have.property('roleId', '"roleId" is required');
        });

    

    // it('User should update their own profile', async () => {
    //     const token = await login(adminMock)
    //     let res =  await setup.chai
    //       .request(setup.app)
    //       .post('/api/v1/users/profiles/id')
    //       .send({ name: 'operations' })
    //       .set('authorization', token);

    //       console.log(`
          
          
    //       This is the id that you are looking for
          
    //       ${res.body.data.id}
          
    //       thank you!`
    //       )
    
    //     const res1= await setup.chai
    //       .request(setup.app)
    //       .put(`/api/v1/roles/${res.body.data.id}`)
    //       .send({ name: 'operationss' })
    //       .set('authorization', token);
    //     setup.expect(res1.status).to.be.equal(200);
    //     setup.expect(res1.body).to.have.property('message', 'Role was updated successfully.');
      
    //   });


      // it('Should Delete a user as Admin', async () => {
      //   const token = await login(adminMock);
      //   const res = await setup.chai
      //     .request(setup.app)
      //     .post('/api/v1/users')
      //     .send()
      //     .set('authorization', token);
    
      //   const res1 =  await setup.chai
      //     .request(setup.app)
      //     .delete(`/api/v1/roles/${res.body.data.id}`)
      //     .set('authorization', token);
      //   setup.expect(res1.status).to.be.equal(200);
      //   setup.expect(res1.body).to.have.property('message', 'Role was deleted successfully!');
      
      // });
    
      it('Should Get all users as Admin', async () => {
        const token = await login(adminMock)
        const res = await setup.chai
        .request(setup.app)
        .get('/api/v1/users')
        .set('authorization', token);
        setup.expect(res.status).to.be.equal(200);
        setup.expect(res.body).to.have.keys('message', 'data');
       
      });

      it('Should Register new user as Admin', async () => {
        const token = await login(adminMock)
        
          const res= await setup.chai
            .request(setup.app)
            .post('/api/v1/users')
            .send(userMock)
            .set('authorization', token)
            setup.expect(res.status).to.be.equal(201);
            setup.expect(res.body).to.have.keys('message','data');
            
        });
    })