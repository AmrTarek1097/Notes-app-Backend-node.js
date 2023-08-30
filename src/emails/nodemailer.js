import nodemailer from "nodemailer";
import { htmlMail } from "./html.js";
import { htmlMailPass } from "./htmlPassword.js";


export const sendEmailVerify = async (x) => {

    const transporter = nodemailer.createTransport({
        service:"gmail",
        auth: {
            // TODO: replace `user` and `pass` values from <https://forwardemail.net>
            user: 'amrtarek370@gmail.com',
            pass: 'izpupkfzquoucbbp'
        }
    });
    
  
    // send mail with defined transport object
     await transporter.sendMail({
        from: '"Amr Tarek 👻" <amrtarek370@gmail.com>', // sender address
        to: x.email, // list of receivers
        subject: "Hello ✔", // Subject line
        html: htmlMail(`http://localhost:3000/user/verified/${x.email}`), // html body   ??x.signUpToken
    });

};


export const sendEmailPass = async (x) => {

    const transporter = nodemailer.createTransport({
        service:"gmail",
        auth: {
            // TODO: replace `user` and `pass` values from <https://forwardemail.net>
            user: 'amrtarek370@gmail.com',
            pass: 'izpupkfzquoucbbp'
        }
    });
    
  
    // send mail with defined transport object
     await transporter.sendMail({
        from: '"Amr Tarek 👻" <amrtarek370@gmail.com>', // sender address
        to: x.email, // list of receivers
        subject: "Change password", // Subject line
        html: htmlMailPass(x.random), // html body   ??x.signUpToken
    });

};