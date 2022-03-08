const operations = require('../operations')
describe('Operations', ()=>{
    it('Should return the sum of two inputs', () =>{
        const result = operations.sum(1,3)
        expect(result).toBe(4)
    })
    
    it('Should return the sum of two inputs', () =>{
        const result = operations.subtruct(1,3)
        expect(result).toBe(-2)
    })
    
    it('Should return the sum of two inputs', () =>{
        const result = operations.multiply(1,3)
        expect(result).toBe(3)
    })

})
