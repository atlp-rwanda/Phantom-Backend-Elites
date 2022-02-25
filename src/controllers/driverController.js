import Operator from "../models/operator.js";
import Driver from "../models/drivers.js";
import bcrypt from "bcrypt";
import "dotenv/config";
import getPassword from "../services/createPassword.js";
import sendEmail from "../services/sendEmail.js";

class DriverAndOperatorController {
  async login(req, res) {
    const project = await User.findOne({ where: { email: req.body.email } });
    const isPasswordMatch = await bcrypt.compare(
      req.body.password,
      project.password
    );
    if (project === null || !isPasswordMatch) {
      res.status(404).send({ message: "Incorrect email or password" });
    } else {
      const token = jwt.sign({ _id: project.email }, process.env.SECRET_KEY);
      res
        .statu(200)
        .send({ token: token, message: "Login successfully", project });
    }
  }

  async registerDriver(req, res) {
    const {
      firstName,
      secondName,
      email,
      phoneNumber,
      idNumber,
      driverLicence,
      dateofBirth,
      gender,
      address,
    } = req.body;
    const password = getPassword();
    const dbDriver = await Driver.findOne({ where: { email } });
    let errors = [];
    // Validate Fields
    if (dbDriver) {
      errors.push({ message: "User with email already exist." });
    }
    if (!firstName) {
      errors.push({ message: "Please add a first name" });
    }
    if (!dateofBirth) {
      errors.push({ message: "Please add your date of birth" });
    }
    if (!gender) {
      errors.push({ message: "Please add your gender" });
    }
    if (!secondName) {
      errors.push({ message: "Please add a last name" });
    }
    if (!email) {
      errors.push({ message: "Please add a email" });
    }
    if (!phoneNumber) {
      errors.push({ message: "Please add a phoneNumber" });
    }
    if (!idNumber) {
      errors.push({ message: "Please add a id number" });
    }
    if (!driverLicence) {
      errors.push({ message: "Please add a driver Licence" });
    }
    if (!address) {
      errors.push({ message: "Please add a address" });
    }

    if (errors.length > 0) {
      res.status(401).json({
        status: "failed",
        errors,
        message: `User was not able to be registered as driver.`,
        enteredData: {
          firstName,
          secondName,
          email,
          phoneNumber,
          idNumber,
          driverLicence,
          dateofBirth,
          gender,
          address,
        },
      });
    } else {
      // const driverRegister = await Driver.sync({ alter: true });
      const driver = await Driver.build({
        firstName,
        secondName,
        email,
        password,
        phoneNumber,
        idNumber,
        driverLicence,
        dateofBirth,
        gender,
        address,
      });

      await driver
        .save()
        .then((results) => {
          const output = `
              <h2>Your account has been registered. you can login in</h2>
              <a href="http://localhost:3000/login">phantom app</a>
              <p>Use ${req.body.email} and your password  <a href="#">${password}</a></p>
          `;
          sendEmail(output, email);
          return results;
        })
        .then((results) => {
          res.status(201).json({
            status: "success",
            message: `User registered as driver successfully!!.`,
            results,
          });
        })
        .catch((err) => {
          res.status(400).json({
            status: "failed",
            error: err.message,
          });
        });
    }
  }

  async registerOperator(req, res) {
    // const driverRegister = await Operator.sync({ alter: true });
    const {
      firstName,
      secondName,
      email,
      phoneNumber,
      idNumber,
      driverLicence,
      dateofBirth,
      gender,
      address,
    } = req.body;
    const password = getPassword();
    const dbDriver = await Operator.findOne({ where: { email } });
    let errors = [];
    // Validate Fields
    if (dbDriver) {
      errors.push({ message: "User with email already exist." });
    }
    if (!firstName) {
      errors.push({ message: "Please add a first name" });
    }
    if (!dateofBirth) {
      errors.push({ message: "Please add your date of birth" });
    }
    if (!gender) {
      errors.push({ message: "Please add your gender" });
    }
    if (!secondName) {
      errors.push({ message: "Please add a last name" });
    }
    if (!email) {
      errors.push({ message: "Please add a email" });
    }
    if (!phoneNumber) {
      errors.push({ message: "Please add a phoneNumber" });
    }
    if (!idNumber) {
      errors.push({ message: "Please add a id number" });
    }
    if (!driverLicence) {
      errors.push({ message: "Please add a driver Licence" });
    }
    if (!address) {
      errors.push({ message: "Please add a address" });
    }

    if (errors.length > 0) {
      res.status(401).json({
        status: "failed",
        errors,
        message: `User was not able to be registered as driver.`,
        enteredData: {
          firstName,
          secondName,
          email,
          phoneNumber,
          idNumber,
          driverLicence,
          dateofBirth,
          gender,
          address,
        },
      });
    } else {
      const operator = await Operator.build({
        firstName,
        secondName,
        email,
        password,
        phoneNumber,
        idNumber,
        driverLicence,
        dateofBirth,
        gender,
        address,
      });
      await operator
        .save()
        .then((results) => {
          const output = `
              <h2>Your account has been registered. you can login in</h2>
              <a href="http://localhost:3000/login">phantom app</a>
              <p>Use ${req.body.email} and your password  <a href="#">${password}</a></p>
          `;
          sendEmail(output, email);
          return results;
        })
        .then((results) => {
          res.status(201).json({
            status: "success",
            message: `User registered as operator successfully!!.`,
            results,
          });
        })
        .catch((err) => {
          res.status(400).json({
            status: "failed",
            error: err.message,
          });
        });
    }
  }
}
export { DriverAndOperatorController as default };
