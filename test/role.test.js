import { response } from 'express'
import Role from '../sequelize/models/Role'
import roleSetup from './setup.js'
describe('Roles', () => {

        describe('/GET Role', () =>{
            it('it should GET all roles', (done) =>{
              roleSetup.chai
                .request(roleSetup.app)
                .get('/api/v1/roles')
                .end((err, response) => {
                    response.should.have.status(200)
                    response.body.should.be.a('array')
                    response.body.should.have.property('status')
                    response.body.length.should.be.eql(0)
                    done()
                })
            })
        })
    })
