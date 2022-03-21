import setup from './setup'
import mocha from 'mocha';
import { adminMock,
    userWithoutFirstName,
    userWithoutLastName,
    userWithoutEmail,
    userWithoutGender,
    userWithoutRole,
    userMock} from './mock/userMocks';


  

describe('User related Tests', async () => {
  let token

  before(async ()=> {
      const userData = await setup.chai.request(setup.app).post('/api/v1/auth/login').send(adminMock);
      token = `Bearer ${userData.body.token}`;
  })

    it.only('Admin should not create a user without firstName', async () => {
        const res =  await setup.chai
          .request(setup.app)
          .post('/api/v1/users')
          .send(userWithoutFirstName)
          .set('authorization', token);
        setup.expect(res.status).to.be.equal(400);
        setup.expect(res.body).to.have.property('firstName', '"firstName" is required');
      });
    
    it.only('Admin should not create a user without lastName', async () => {
          const res =  await setup.chai
            .request(setup.app)
            .post('/api/v1/users')
            .send(userWithoutLastName)
            .set('authorization', token);
          setup.expect(res.status).to.be.equal(400);
          setup.expect(res.body).to.have.property('lastName', '"lastName" is required');
        });
    it.only('Admin should not create a user without email', async () => {
  
              const res =  await setup.chai
                .request(setup.app)
                .post('/api/v1/users')
                .send(userWithoutEmail)
                .set('authorization', token);
              setup.expect(res.status).to.be.equal(400);
              setup.expect(res.body).to.have.property('email', '"email" is required');
            });
    it.only('Admin should not create a user without gender', async () => {
            const res =  await setup.chai
            .request(setup.app)
            .post('/api/v1/users')
            .send(userWithoutGender)
            .set('authorization', token);
            setup.expect(res.status).to.be.equal(400);
            setup.expect(res.body).to.have.property('gender', '"gender" is required');
        });
    it.only('Admin should not create a user without assigning him a role', async () => {
            const res =  await setup.chai
            .request(setup.app)
            .post('/api/v1/users')
            .send(userWithoutRole)
            .set('authorization', token);
            setup.expect(res.status).to.be.equal(400);
            setup.expect(res.body).to.have.property('roleId', '"roleId" is required');
        });


      it.only('Should Delete a user as Admin', async () => {
    const id =3
        const res1 =  await setup.chai
          .request(setup.app)
          .delete(`/api/v1/roles/${id}`)
          .set('authorization', token); 
        setup.expect(res1.status).to.be.equal(200);
        setup.expect(res1.body).to.have.property('message', 'Role was deleted successfully!');
      
      });

      it.only('Should Get a specific user as Admin', async () => {
        const id =2

        const res1 = await setup.chai
        .request(setup.app)
        .get(`/api/v1/users/${id}`)
        .set('authorization', token);
        setup.expect(res1.status).to.be.equal(200);
        setup.expect(res1.body).to.have.key('data');
      });

    
      it.only('Should Get all users as Admin', async () => {
        const res = await setup.chai
        .request(setup.app)
        .get('/api/v1/users')
        .set('authorization', token);
        setup.expect(res.status).to.be.equal(200);
        setup.expect(res.body).to.have.keys('message', 'data');
       
      });

      it.only('Should Register new user as Admin', async () => {


            const res1= await setup.chai
            .request(setup.app)
            .post('/api/v1/users')
            .send(userMock)
            .set('authorization', token)
            setup.expect(res1.status).to.be.equal(201);
            setup.expect(res1.body).to.have.keys('message','data');
            
        });

        
  it.only(`It should return a sucessfully login message`, () => {
    setup.chai
      .request(setup.app)
      .post("/api/v1/auth/login")
      .send(adminMock)
      .end((err, response) => {
        response.should.have.status(200);
        response.body.should.have.property("message");
        setup
          .expect(response.body.message)
          .to.equals('A token for your session has been saved!')
        
      });   
  });
  it.only(`It should return unsucessfully login message for incorrect password`, () => {
    const user = {
      email: "admin@admin.com",
      password: "admin123456"
    }
    setup.chai
      .request(setup.app)
      .post("/api/v1/auth/login")
      .send(user)
      .end((err, response) => {
        response.should.have.status(200);
        response.body.should.have.property("message");
        setup.expect(response.body.message)
          .to.equals('Incorrect email or password');
      });
  });
  it.only(`It should return unsucessfully login`, async () => {
    const user = {
      email: "admin1@gmail.com",
      password: "admin"
    }
    const res = await setup.chai
      .request(setup.app)
      .post("/api/v1/auth/login")
      .send(user)
      setup.expect(res.status).to.be.equal(400)
      setup.expect(res.body).to.have.property('message', 'Wrong email detected!')

  });
  it.only('Should log user out successfully', async () => {
    const res = await setup.chai
    .request(setup.app)
    .post('/api/v1/auth/logout')
    .set('authorization', token)
    setup.expect(res.status).to.be.equal(200)
    setup.expect(res.body).to.have.property('message', 'Logged out successfully!')
  });
    })