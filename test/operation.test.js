import setup from './setup'
import mocha from 'mocha';
import { adminMock, userWithoutFirstName } from './mock/userMocks';
const login = async (user) => {
    const userData = await setup.chai.request(setup.app)
        .post('/api/v1/auth/login').send(user);
    return `Bearer ${userData.body.token}`;
};
describe('User related Tests', async () => {
    it('Admin should not create a user without firstName', async () => {
        const token = await login(adminMock)
        const res = await setup.chai.request(setup.app)
            .post('/api/v1/users').send(userWithoutFirstName)
            .set('authorization', token);

        setup.expect(res.status).to.be.equal(400);
        setup.expect(res.body).to.have.property('firstName', '"firstName" is required');
    });
    //  it('Admin should not create a user without lastName', async () => { 
    //      const token = await login(adminMock) 
    //      const res = await setup.chai .request(setup. 
    it('Insert driver role', async () => {
        const user = {
            email: "admin@admin.com",
            password: "admin"
        }
        const token = await login(user)
        const role = {
            id: 2,
            name: "driver"
        }
        const res = await setup.chai
            .request(setup.app)
            .post("/api/v1/roles")
            .set({ "authorization": `${token}` })
            .send(role)
        setup.expect(res.status).to.be.equal(201);
        setup.expect(res.body).to.have.property("message");
    });
});