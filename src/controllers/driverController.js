import bcrypt from "bcrypt";
import "dotenv/config";
import getPassword from "../services/createPassword.js";
import sendEmail from "../services/sendEmail.js";
import Users from "../../sequelize/models/user.js";
import Profiles from "../../sequelize/models/profile.js";
import { Sequelize } from "sequelize";
import jwt from "jsonwebtoken";
import { development } from "../../sequelize/config/config.js";
let sequelize = new Sequelize(development);
let User = Users(sequelize, Sequelize);
let Profile = Profiles(sequelize, Sequelize);

class UserController {
  async registerDatabase(req, res) {
    const driverRegister = await User.sync({ alter: true });
    const profileRegister = await Profile.sync({ alter: true });
    res.send("database created");
  }
  async login(req, res) {
    let isPasswordMatch = "";
    const project = await User.findOne({ where: { email: req.body.email } });
    if (project) {
      isPasswordMatch = await bcrypt.compare(
        req.body.password,
        project.password
      );
    }
    if (project === null || !isPasswordMatch) {
      res.status(404).send({ message: "Incorrect email or password" });
    } else {
      const token = jwt.sign(
        { _id: project.email, role: project.role },
        process.env.SECRET_KEY
      );
      res.status(200).json({
        token,
        message: "Login successfully",
        user: {
          firstName: project.firstName,
          lastName: project.lastName,
          email: project.email,
          role: project.role,
        },
      });
    }
  }

  async registerDriver(req, res) {
    const {
      firstName,
      lastName,
      email,
      phoneNumber,
      idNumber,
      driverLicence,
      dateofBirth,
      gender,
      address,
    } = req.body;
    const userpassword = getPassword();
    const password = await bcrypt.hash(userpassword, 12);
    const dbDriver = await User.findOne({ where: { email } });
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
    if (!lastName) {
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
          lastName,
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
      const driver = User.build({
        firstName,
        lastName,
        email,
        password,
        gender,
        address,
        role: "driver",
      });

      await driver
        .save()
        .then(async (results) => {
          const profile = Profile.build({
            driverLicence,
            dateofBirth,
          });

          await profile
            .save()
            .then((results) => {
              const output = `
              <h2>Your account has been registered. you can login in</h2>
              <a href="http://localhost:3000/login">phantom app</a>
              <p>Use ${req.body.email} and your password  <a href="#">${userpassword}</a></p>
          `;
              sendEmail(output, email);
              return results;
            })
            .then((results) => {
              res.status(201).json({
                status: "success",
                message: `User registered as driver successfully!!.`,
              });
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
    const {
      firstName,
      lastName,
      email,
      phoneNumber,
      idNumber,
      driverLicence,
      dateofBirth,
      gender,
      address,
    } = req.body;
    const userpassword = getPassword();
    const password = await bcrypt.hash(userpassword, 12);
    const dbDriver = await User.findOne({ where: { email } });
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
    if (!lastName) {
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
          lastName,
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
      const driver = User.build({
        firstName,
        lastName,
        email,
        password,
        gender,
        address,
        role: "operator",
      });

      await driver
        .save()
        .then(async (results) => {
          const profile = Profile.build({
            driverLicence,
            dateofBirth,
          });

          await profile
            .save()
            .then((results) => {
              const output = `
              <h2>Your account has been registered as operator. you can login in</h2>
              <a href="http://localhost:3000/login">phantom app</a>
              <p>Use ${req.body.email} and your password  <a href="#">${userpassword}</a></p>
          `;
              sendEmail(output, email);
              return results;
            })
            .then((results) => {
              res.status(201).json({
                status: "success",
                message: `User registered as operator successfully!!.`,
              });
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
export { UserController as default };
