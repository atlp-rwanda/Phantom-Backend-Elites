import { expect as _expect } from "chai";
import add from "../src/models/addition";

const expect = _expect;

describe(`addition`, () => {
  it(`it should add 2 number`, (done) => {
    add(1, 4)
      .then((result) => {
        expect(result).to.equal(5);
        done();
      })
      .catch((error) => {
        done(error);
      });
  });
});
