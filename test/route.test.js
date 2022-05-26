import newSet from "./setup.js";

describe(`Routes API`, () => {
    it(`Should get all the routes created`, (done) => {
        newSet.chai
            .request(newSet.app)
            .get("/api/v1/route")
            .end((err, response) => {
                response.should.have.status(200);
                // response.body.should.be.an("array");
                // response.body.should.have.property("id");
                // response.body.should.have.property("data");
                // newSet
                //     .expect(response.body.data)
                //     .to.equals("Welcome to phantom app backend side");
                done();
            });
    });
});