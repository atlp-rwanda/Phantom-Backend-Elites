import chai from "chai";
import chaiHttp from "chai-http";
import app from "../src/server.js";
import should from "chai";

chai.should();
chai.use(chaiHttp);
const { expect } = chai;

const defExp = { chai, app, chaiHttp, expect };
export default defExp;
