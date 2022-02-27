import nodemailer from "nodemailer";
import "dotenv/config";

function sendEmail(output, toEmail) {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.USER_EMAIL,
      pass: process.env.USER_EMAIL_P,
    },
  });
  let mailOptions = {
    from: process.env.USER_EMAIL, // sender address
    to: toEmail, // list of receivers
    subject: "Phantom account has been registered", // Subject line
    html: output, // html body
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

    res.render("contact", { msg: "Email has been sent" });
  });
}

export default sendEmail;
