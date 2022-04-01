// import setup from './setup'
// import { viewListWithoutSource, viewListWithoutDestination, viewListOfBuses } from './mock/busMock';

// describe('View list of buses tests', async () => {

//     it ('Should not get the list of buses on a perticular route if not provided its source', async () => {
//         const res = await setup.chai
//           .request(setup.app)
//           .post('/api/v1/view-buses')
//           .send(viewListWithoutSource)
//         setup.expect(res.status).to.be.equal(400);
//         setup.expect(res.body).to.have.property('source', '"source" is required');
//       });

//     it ('Should not get the list of buses on a perticular route if not provided its destination', async () => {
//         const res = await setup.chai
//           .request(setup.app)
//           .post('/api/v1/view-buses')
//           .send(viewListWithoutDestination)
//         setup.expect(res.status).to.be.equal(400);
//         setup.expect(res.body).to.have.property('destination', '"destination" is required');
//       });

    
//     it ('Should get the list of buses on a perticular route', async () => {
//         const res = await setup.chai
//           .request(setup.app)
//           .post('/api/v1/view-buses')
//           .send(viewListOfBuses)
//         setup.expect(res.status).to.be.equal(200);
//         setup.expect(res.body).to.have.property("message", "Buses found! Below is the list of available buses for this route.");
//       });
//     })