import bcrypt from "bcrypt";
import "dotenv/config";
import getPassword from "../services/createPassword.js";
import sendEmail from "../services/sendEmail.js";
import Users from '../../sequelize/models/User'
import { development } from "../../sequelize/config/config.js";
import { Sequelize } from "sequelize";
let sequelize = new Sequelize(development);
let User = Users(sequelize, Sequelize);
import Profiles from "../../sequelize/models/profile.js";
let Profile = Profiles(sequelize, Sequelize);


class UserController{
    

  async createUser(req, res) {
    // Validate request
    // if (!req.body.name) {
    //   res.status(400).send({
    //     message: "Name can not be empty!"
    //   });
    //   return;
    // }
    // Create a User
    // const  { name } = req.body
    // Save User in the database
    // console.log(req.body)

const userpassword = getPassword();
const password = userpassword


    await User.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password,
        roleId: req.body.roleId,
        dateofbirth:req.body.dateofbirth,
        gender: req.body.gender,
        address:req.body.address,
        token:"",


    })

      .then(async data => {
       
        await Profile.create({
            userId: data.id,
            
          }).then(results =>{
            const output = `
            <h2>Your account has been registered. you can login in</h2>
            <a href="http://localhost:3000/login">phantom app</a>
            <p>Use ${req.body.email} and your password  <a href="#">${userpassword}</a></p>
        `;
            sendEmail(output, data.email);
            console.log(data.email)
            return results;
          });
          
          res.send(data);
         
        
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the User."
        });
      });
};


async findOneUser(req, res) {
    const id = req.params.id;
    User.findByPk(id)
      .then(data => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Cannot find User with id=${id}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving User with id=" + id
        });
      });
};

async findAllUsers(req, res) {
  



    User.findAll()
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Users."
        });
      });
};

async updateUser(req, res) {
    const id = req.params.id;
    User.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "User was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update User with id=${id}. Maybe User was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating User with id=" + id
        });
      });
};

async deleteUser(req, res) {
    const id = req.params.id;
    User.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "User was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete User with id=${id}. Maybe User was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete User with id=" + id
        });
      });
};

}
export default UserController
 