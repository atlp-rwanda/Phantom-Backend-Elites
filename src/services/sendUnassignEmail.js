import nodemailer from "nodemailer";
import "dotenv/config";

function sendUnassignEmail(output, email) {
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    host: process.env.TRANSPORTER_HOST ,
    port: process.env.TRANSPORTER_PORT,
    secure: process.env.SECURE,
    auth: {
      user: process.env.USER_EMAIL,
      pass: process.env.USER_EMAIL_P,
    },
  });
  let mailOptions = {
    from: process.env.USER_EMAIL, // sender address
    to: email, // list of receivers
    subject: "Unassigned to a Bus", // Subject line
    html: output, // html body
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }

    res.render("contact", { msg: "Email has been sent" });
  });
}

export default sendUnassignEmail;
