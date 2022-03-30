import chai from "chai";
import chaiHttp from "chai-http";
import app from "../src/server.js";
<<<<<<< HEAD
=======

>>>>>>> 28d1207518e37cafa216af9b13f43d89cb8edf4f

chai.should();
chai.use(chaiHttp);
const { expect } = chai;

const defExp = { chai, app, chaiHttp, expect };
export { defExp as default };
 