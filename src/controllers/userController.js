import bcrypt from "bcrypt";
import "dotenv/config";
import getPassword from "../services/createPassword.js";
import sendEmail from "../services/sendEmail.js";
import {User} from '../../sequelize/models'


class UserController {
   async createUser(req, res) {
    const userpassword = getPassword();
    const password = await bcrypt.hash(userpassword, 12)
    User.create({
        firstName: req.body.firstName,lastName: req.body.lastName,email: req.body.email,password, roleId: req.body.roleId,gender: req.body.gender,
    })
      .then(async data => { const output = `
            <h3>Hi ${req.body.firstName}</h3>
            <h3>Welcome to Phantom!</h3>
            <h3>You have been successfully registered. You can login using the following credentials:</h3>
            <p><span style="font-weight:bold">Email:</span>${req.body.email} </p>
            <p><span style="font-weight:bold">Password:</span>${userpassword}</p>
        `;
            sendEmail(output, data.email);
            res.status(201).json({message: "User created successfully!",data});
          }).catch(err => {
        res.status(500).json({
          message:
            err.message || "Some error occurred while creating the User."
        });});};

  async findOneUser(req, res) {
    const id = req.params.id;
    User.findByPk(id, {attributes: {
      exclude: ['password']
  }})
      .then(data => {
        
        if (data) {
          
          res.json({data});
        } else {
          res.status(404).json({
            message: `Cannot find User with id=${id}.`
          });
        }
      })
      .catch(err => {
        res.status(500).json({
          message: "Error retrieving User with id=" + id
        });
      });
  };

  async findAllUsers(req, res) {
    User.findAll({attributes: {
        exclude: ['password']
    }})
      .then(data => {
        console.log(data)
        res.status(200).json(data);

      })
      .catch(err => {
        res.status(500).json({
          message:
            err.message || "Some error occurred while retrieving Users."
        });
      });
  };

async updateProfile(req, res) {
  try {
    const id = req.params.id;
    const profilePic = req.file?.path;
    console.log(profilePic,"----")
    const bodyData = req.body
    const body = profilePic
      ? { ...bodyData, profilePic}
      : bodyData
    console.log(body)
    const updatedUser = await User.update(body, {
      where: { id: id },
      returning: true
    })
  if(updatedUser[1].length){
    res.status(200).json({
            message: "Profile was updated successfully.",
            data:updatedUser[1][0]
          });
        } else {
          res.status(404).json({
            error: `User with the ${id} does not exist`
          });
        }
  } catch (error) {
    console.log(error);
    res.status(500).json({
          error: "Oops, something went wrong"
        });
  }
  };

  async deleteUser(req, res) {
    const id = req.params.id;
    User.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.json({
            message: "User was deleted successfully!"
          });
        } else {
          res.json({
            message: `Cannot delete User with id=${id}. Maybe User was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).json({
          message: "Could not delete User with id=" + id
        });
      });
  };

}
export default UserController