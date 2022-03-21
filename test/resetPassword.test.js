import setup from './setup'
import { adminMock,userPasswordReset,resetPasswordWithInvalidToken } from './mock/userMocks';

describe('Password reset tests', async () =>{
    let token

    before(async ()=> {
        const user= await setup.chai.request(setup.app).post('/api/v1/auth/login').send(userPasswordReset);
        token = `Bearer ${user.body.token}`;
    })

    it.only('Should not get a reset password link sent to the email', async () => {
        const res1= await setup.chai
        .request(setup.app)
        .post('/api/v1/reset-password/link')
        .send({email:"reset@gmail.com"})
        .set('authorization', token)
        setup.expect(res1.status).to.be.equal(400);
        setup.expect(res1.body).to.have.keys('message');        
    });

    it.only('Should get a reset password link sent to the email', async () => {
          const res1= await setup.chai
          .request(setup.app)
          .post('/api/v1/reset-password/link')
          .send({email:"reset@password.com"})
          .set('authorization', token)
          setup.expect(res1.status).to.be.equal(200);
          setup.expect(res1.body).to.have.keys('message');          
      });

      it.only('Should not successfully reset a password without a password reset token.', async () => {
        const res1= await setup.chai
        .request(setup.app)
        .post('/api/v1/reset-password/new-password')
        .send({password:'Testing', confirmPassword:'Testing'})
        .set('authorization', token)
        setup.expect(res1.status).to.be.equal(400);
        setup.expect(res1.body).to.have.property('token','"token" is required');
    });

    it.only('Should not successfully reset a password with an invalid password reset token.', async () => {
        const res1= await setup.chai
        .request(setup.app)
        .post('/api/v1/reset-password/new-password')
        .send(resetPasswordWithInvalidToken)
        .set('authorization', token)
        setup.expect(res1.status).to.be.equal(404);
        setup.expect(res1.body).to.have.property('message', 'Token has expired. Please try password reset again.');
    });

    it.only('Should reset the user password successfully.', async () => {
          const res1= await setup.chai
          .request(setup.app)
          .post('/api/v1/reset-password/new-password')
          .send({email:"reset@password.com"})
          .set('authorization', token)
          setup.expect(res1.status).to.be.equal(200);
          setup.expect(res1.body).to.have.keys('message');
      });
})