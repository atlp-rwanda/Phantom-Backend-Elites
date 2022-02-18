// let chai = require(`chai`);
import chai from "chai";
let expect = chai.expect;
// let addition = require(`../modules/addition`);
import add from "../modules/addition.js";
let addition = add;

describe(`addition`, () => {
  it(`it should add 2 number`, (done) => {
    add(1, 4)
      .then(function (result) {
        expect(result).to.equal(5);
        done();
      })
      .catch(function (error) {
        done(error);
      });
  });
});
