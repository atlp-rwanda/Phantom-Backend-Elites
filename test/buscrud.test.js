import newSet from "./setup";
import { roles, users } from './mock/data'
import { response } from "express";

 
describe('Bus Crud', function(){
  let token;
   before((done)=>{
    const user = {
      email: "admin@admin.com",
      password: "admin"
    }
    newSet.chai
    .request(newSet.app)
    .post('/api/v1/auth/login')
    .send(user)
    .end((err,response)=>{
      token =  `Bearer ${response.body.token}`;
      done()
    })
  })
  it('Insert driver role', (done) => {
    const role = {
      id: 2,
      name: "driver"
    }
    newSet.chai
      .request(newSet.app)
      .post("/api/v1/roles")
      .set({ "authorization": `${token}` })
      .send(role)
      .end((err, response) => {
        // console.log('======================================================>',response)
        response.should.have.status(201);
        response.body.should.have.property("message");
        newSet
          .expect(response.body.message)
        done();
      });
  });
  it('Insert driver a role', (done) => {
    const role = {
      id: 2,
      name: "driver"
    }
    newSet.chai
      .request(newSet.app)
      .post("/api/v1/roles")
      .set({ "authorization": `${token}` })
      .send(role)
      .end((err, response) => {
        // console.log('======================================================>',response)
        response.should.have.status(201);
        response.body.should.have.property("message");
        newSet
          .expect(response.body.message)
        done();
      });
  });

  it('Insert operator role', (done) => {
    const role = {
      id: 3,
      name: "operator"
    }
    newSet.chai
      .request(newSet.app)
      .post("/api/v1/roles")
      .set({ "authorization": `${token}` })
      .send(role)
      .end((err, response) => {
        // console.log('======================================================>',response)
        response.should.have.status(201);
        response.body.should.have.property("message");
        newSet
          .expect(response.body.message)
        done();
      });
  });
  it('Insert an operator user table', (done) => {
    const user = {
      firstName: "john",
      lastName: "smith",
      email: "nkrmoise@gmail.com",
      roleId: 3,
      dateofbirth: "2020-1-1",
      gender: "male",
      address: "kigali"
    }
    newSet.chai
      .request(newSet.app)
      .post("/api/v1/users")
      .set({ "authorization": `${token}` })
      .send(user)
      .end((err, response) => {
        response.should.have.status(200);
        response.body.should.have.property("message");
        newSet
          .expect(response.body.message)
        done();
      });
  });
  it('Insert operator user table', (done) => {
    const user = {
      firstName: "john",
      lastName: "smith",
      email: "nkrmoise@gmail.com",
      roleId: 3,
      dateofbirth: "2020-1-1",
      gender: "male",
      address: "kigali"
    }
    newSet.chai
      .request(newSet.app)
      .post("/api/v1/users")
      .set({ "authorization": `${token}` })
      .send(user)
      .end((err, response) => {
        response.should.have.status(200);
        response.body.should.have.property("message");
        newSet
          .expect(response.body.message)
        done();
      });
  });
  it('Insert driver user table', (done) => {
    const user = {
      firstName: "jane",
      lastName: "janet",
      email: "moiseninyokuru1@gmail.com",
      roleId: 2,
      dateofbirth: "2020-1-1",
      gender: "male",
      address: "kigali"
    }
    newSet.chai
      .request(newSet.app)
      .post("/api/v1/users")
      .set({ "authorization": `${token}` })
      .send(user)
      .end((err, response) => {
        response.should.have.status(200);
        response.body.should.have.property("message");
        newSet.expect(response.body.message)
      done();
      });
  });
  it('create bus', (done) => {
    const bus = {
      brand: "Jaquar",
      plateNo: "RAB100A",
      driver: 2,
      seats: 20,
      status: "at rest"
    }
    newSet.chai
      .request(newSet.app)
      .post("/api/v1/buses")
      .set({ "authorization": `${token}` })
      .send(bus)
      .end((err, response) => {
        console.log(response)
        // response.should.have.status(201);
        // response.body.should.have.property("message");
        // newSet
        //   .expect(response.body.message)
        // done();
      });
  });
  it('should create bus', (done) => {
    const bus = {
      brand: "Jaquar",
      plateNo: "RAB100A",
      driver: 2,
      seats: 20,
      status: "at rest"
    }
    newSet.chai
      .request(newSet.app)
      .post("/api/v1/buses")
      .set({ "authorization": `${token}` })
      .send(bus)
      .end((err, response) => {
        response.should.have.status(201);
        response.body.should.have.property("message");
        newSet
          .expect(response.body.message)
        done();
      });
  });
  it('should update bus', (done) => {
    const bus = {
      brand: "Jaquar 2020",
      seats: 64,
      status: "at rest"
    }
    newSet.chai
      .request(newSet.app)
      .put("/api/v1/buses/RAB100A")
      .set({ "authorization": `${token}` })
      .send(bus)
      .end((err, response) => {
        response.should.have.status(201);
        response.body.should.have.property("message");
        newSet
          .expect(response.body.message)
        done();
      });
  });
  it('should return bus information', (done) => {
    newSet.chai
      .request(newSet.app)
      .get("/api/v1/buses/RAB100A")
      .set({ "authorization": `${token}` })
      .send()
      .end((err, response) => {
        response.should.have.status(200);
        response.body.should.have.property("message");
        newSet
          .expect(response.body.message)
        done();
      });
  });
  it('should delete bus', (done) => {
    newSet.chai
      .request(newSet.app)
      .delete("/api/v1/buses/RAB100A")
      .set({ "authorization": `${token}` })
      .send()
      .end((err, response) => {
        response.should.have.status(200);
        response.body.should.have.property("message");
        newSet
          .expect(response.body.message)
        done();
      });
  });
  it('should delete bus', (done) => {
    newSet.chai
      .request(newSet.app)
      .delete("/api/v1/buses/RAB100A")
      .set({ "authorization": `${token}` })
      .send()
      .end((err, response) => {
        response.should.have.status(200);
        response.body.should.have.property("message");
        newSet
          .expect(response.body.message)
        done();
      });
  });



});
