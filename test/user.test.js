import setup from './setup'
import { adminMock,
    userWithoutFirstName,
    userWithoutLastName,
    userWithoutEmail,
    userWithoutGender,
    userWithoutRole,
    userMock,userToDelete} from './mock/userMocks';


    const login = async (user) => {
      const tokenData = await setup.chai.request(setup.app).post('/api/v1/auth/login').send(user);
      return `Bearer ${tokenData.body.token}`;
    };
    describe('User related Tests', async () => {
      
     
      // it('Admin should not create a user without firstName', (done) => {
        
      //   setup.chai
      //   .request(setup.app)
      //     .post('/api/v1/users')
      //     .send(userWithoutFirstName)
      //     .set('authorization', token)
      //     .end( (err, res) => {
      //       if (err) done(err)
      //       setup.expect(res.status).to.be.equal(400);
      //       setup.expect(res.body).to.have.property('firstName', '"firstName" is required');
      //       done()

      //     })
      // });
    
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
  //   it ('Admin should not create a user without email', async () => {
      
  
  //             const res =  await setup.chai
  //               .request(setup.app)
  //               .post('/api/v1/users')
  //               .send(userWithoutEmail)
  //               .set('authorization', token);
  //             setup.expect(res.status).to.be.equal(400);
  //             setup.expect(res.body).to.have.property('email', '"email" is required');
  //           });
  //   it ('Admin should not create a user without gender', async () => {
      
  //           const res =  await setup.chai
  //           .request(setup.app)
  //           .post('/api/v1/users')
  //           .send(userWithoutGender)
  //           .set('authorization', token);
  //           setup.expect(res.status).to.be.equal(400);
  //           setup.expect(res.body).to.have.property('gender', '"gender" is required');
  //       });
  //   it ('Admin should not create a user without assigning him a role', async () => {
      
  //           const res =  await setup.chai
  //           .request(setup.app)
  //           .post('/api/v1/users')
  //           .send(userWithoutRole)
  //           .set('authorization', token);
  //           setup.expect(res.status).to.be.equal(400);
  //           setup.expect(res.body).to.have.property('roleId', '"roleId" is required');
  //       });


  //   it ('Should Delete a user as Admin', async () => {
        
  //       const id =3
    
  //       const res1 =  await setup.chai
  //         .request(setup.app)
  //         .delete(`/api/v1/users/${id}`)
  //         .set('authorization', token); 
  //       setup.expect(res1.status).to.be.equal(200);
  //       setup.expect(res1.body).to.have.property('message', 'User was deleted successfully!');
      
  //     });

  //   it ('Should Get a specific user as Admin', async () => {
        
  //       const id =2

  //       const res1 = await setup.chai
  //       .request(setup.app)
  //       .get(`/api/v1/users/${id}`)
  //       .set('authorization', token);
  //       setup.expect(res1.status).to.be.equal(200);
  //       setup.expect(res1.body).to.have.key('data');
  //     });

    
  //   it ('Should Get all users as Admin', async () => {
        
  //       const res = await setup.chai
  //       .request(setup.app)
  //       .get('/api/v1/users')
  //       .set('authorization', token);
  //       setup.expect(res.status).to.be.equal(200);
  //       setup.expect(res.body).to.have.keys('message', 'data');
       
  //     });

  //   it ('Should Register new user as Admin', async () => {
  //           const res1= await setup.chai
  //           .request(setup.app)
  //           .post('/api/v1/users')
  //           .send(userMock)
  //           .set('authorization', token)
  //           setup.expect(res1.status).to.be.equal(201);
  //           setup.expect(res1.body).to.have.keys('message','data');
            
  //       });

        
        
        
      
  //   it (`It should return unsucessfully login message for incorrect password`, () => {
  //         const user = {
  //           email: "admin@admin.com",
  //           password: "admin123456"
  //         }
  //         setup.chai
  //     .request(setup.app)
  //     .post("/api/v1/auth/login")
  //     .send(user)
  //     .end((err, response) => {
  //       response.should.have.status(404);
  //       response.body.should.have.property("message");
  //       setup.expect(response.body.message)
  //         .to.equals('Incorrect email or password');
  //     });
  //    });
  //   it (`It should return unsucessfully login`, async () => {
  //   const user = {
  //     email: "admin1@gmail.com",
  //     password: "admin"
  //   }
  //   const res = await setup.chai
  //     .request(setup.app)
  //     .post("/api/v1/auth/login")
  //     .send(user)
  //     setup.expect(res.status).to.be.equal(400)
  //     setup.expect(res.body).to.have.property('message', 'Wrong email detected!')

  //   });
  //   it ('Should log user out successfully', async () => {
    
  //   const res = await setup.chai
  //   .request(setup.app)
  //   .post('/api/v1/auth/logout')
  //   .set('authorization', token)
  //   setup.expect(res.status).to.be.equal(200)
  //   setup.expect(res.body).to.have.property('message', 'Logged out successfully!')
  //   });
  //  it (`It should return a sucessfully login message`, (done) => {
  //   setup.chai
  //     .request(setup.app)
  //     .post("/api/v1/auth/login")
  //     .send(adminMock)
  //     .end((err, response) => {
  //       if (err) done(err)
  //       response.should.have.status(200);
  //       response.body.should.have.property("message");
  //       setup
  //         .expect(response.body.message)
  //         .to.equals('A token for your session has been saved!')
  //       done()
  //     });   
  // });
    })