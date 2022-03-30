// import setup from './setup'
// import { adminMock,userPasswordReset,resetPasswordWithInvalidToken } from './mock/userMocks';

// describe('Password reset tests', async () =>{
//     let token

//     before(async ()=> {
//         const user= await setup.chai.request(setup.app).post('/api/v1/auth/login').send(userPasswordReset);
//         token = `Bearer ${user.body.token}`;
//     })

//     it ('Should not get a reset password link sent to the email', async () => {
//         const res1= await setup.chai
//         .request(setup.app)
//         .post('/api/v1/reset-password/link')
//         .send({email:"reset@gmail.com"})
//         setup.expect(res1.status).to.be.equal(400);
//         setup.expect(res1.body).to.have.keys('message');        
//     });

//     it ('Should get a reset password link sent to the email', async () => {
//           const res1= await setup.chai
//           .request(setup.app)
//           .post('/api/v1/reset-password/link')
//           .send({email:"reset@password.com"})

//           setup.expect(res1.status).to.be.equal(200);
//           setup.expect(res1.body).to.have.keys('message', 'token');          
//       });

//       it ('Should not successfully reset a password without a password reset token.', async () => {
//         const res1= await setup.chai
//         .request(setup.app)
//         .post('/api/v1/reset-password/new-password')
//         .send({password:'Testing', confirmPassword:'Testing'})
//         setup.expect(res1.status).to.be.equal(400);
//         setup.expect(res1.body).to.have.property('token','"token" is required');
//     });

//     it ('Should not successfully reset a password with an invalid password reset token.', async () => {
//         const res1= await setup.chai
//         .request(setup.app)
//         .post('/api/v1/reset-password/new-password')
//         .send(resetPasswordWithInvalidToken)
//         setup.expect(res1.status).to.be.equal(500);
//         setup.expect(res1.body).to.have.keys('status', 'message')
//     });

//     it ('Should reset the user password successfully.', async () => {
//         const res= await setup.chai
//         .request(setup.app)
//         .post('/api/v1/reset-password/link')
//         .send({email:"reset@password.com"})


//         let res1= await setup.chai
//         .request(setup.app)
//         .post('/api/v1/reset-password/new-password')
//         .send(
//             {token:res.body.token,
//             password:'password',
//             confirmPassword:'password'
//         })
//         setup.expect(res1.status).to.be.equal(200);
//         setup.expect(res1.body).to.have.keys('status','message');
//       });
// })