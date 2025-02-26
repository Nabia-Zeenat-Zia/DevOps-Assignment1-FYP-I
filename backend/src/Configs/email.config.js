import nodemailer from "nodemailer";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const smtpConfig = {
  host: "smtp-relay.brevo.com",
  port: 587,
  secure: false,
  auth: {
    user: "6864c4001@smtp-brevo.com",
    pass: "jsBa1Oh2FzQwgYrS",
  },
};

const trainsporter = nodemailer.createTransport(smtpConfig);

const loadEmailTemplate = (templatePath) => {
  return new Promise((resolve, reject) => {
    fs.readFile(templatePath, { encoding: "utf-8" }, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

const sendOTP = async (name, To, OTP) => {
  const templatePath = path.join(__dirname, "../Templates/OtpMail.html");

  try {
    let otpMail = await loadEmailTemplate(templatePath);
    otpMail = otpMail.replace("{name}", name);
    otpMail = otpMail.replace("{your OTP}", OTP);
    const mailOptions = {
      from: '"GreenNest" <GreenNestManagement@gmail.com>',
      to: To,
      subject: "OTP Verification",
      html: otpMail,
    };
    await trainsporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Error in sending OTP:", error);
  }
};

export default sendOTP;
