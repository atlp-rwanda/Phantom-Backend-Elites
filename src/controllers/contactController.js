import dotenv from "dotenv";
import { Contact } from "../../sequelize/models";
import nodemailer from "nodemailer";

dotenv.config();

class Contacts {
  static create(req, res) {
    const { fullname, email, telnumber, message } = req.body;

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      host: process.env.TRANSPORTER_HOST,
      port: process.env.TRANSPORTER_PORT,
      secure: process.env.SECURE,
      auth: {
        user: process.env.USER_EMAIL,
        pass: process.env.USER_EMAIL_P,
      },
    });
    const mailOptions = {
      from: email,
      to: process.env.USER_EMAIL,
      subject: `Message from ${fullname}`,
      html: `
            <div>
              <h4>${message}</h4>
              <h1 style="color:#417bf0; margin:0px;">-----------------------------------------------------</h1>
              <h4 style="color:#417bf0; margin:0px;">Reply ${fullname} by clicking on their email</h4>
              <p style="margin:0px">Sender's Email: ${email}</p>
              <p style="margin:0px">Sender's Tel Number: ${telnumber}</p>
            </div>
              `,
    };
  
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return res.json({
          error: error.message
        })
      }
  
      res.json({ message: "Email has been sent" });
    });
    
    if (fullname === "" || email === "" || telnumber ==="" || message === "") {
      return res.status(500).json({
        message: "All field must be completed",
      });
    }

    else if (telnumber.length !== 10){
      return res.status(500).json({
        message: "The number must be 10 digits",
      });
    }
    return Contact.create({
          fullname,
          email,
          telnumber,
          message
        })
          .then((data) => {
            if (data) {
              res.status(200).json({
                message: "You message has successfully been delivered",
                data,
              });
            }
          })
          .catch((err) =>
            res.status(400).json({
              error: err.message,
            })
          );
  } 

  static getAll(req, res) {
    return Contact.findAll()
      .then((data) => {
        if (data.length === 0) {
          return res.status(404).json({
            message: "There are no messages yet!",
          });
        }
        return res.status(200).json({
          data,
        });
      })
      .catch((err) => {
        res.status(400).json({
          error: err.message,
        });
      });
  }
}
export default Contacts;
