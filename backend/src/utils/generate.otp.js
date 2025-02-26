import OTPuser from "../Models/UserOTP.js";
import sendOTP from "../Configs/email.config.js";

const generateOTP = () => Math.floor(1000 + Math.random() * 9000).toString();

const handleOTP = async (fname, email) => {
  let OTP = generateOTP();
  const newOTPuser = new OTPuser({
    email: email,
    otp: OTP,
    expiry: new Date(Date.now() + 60 * 1000), // 1 minute
  });

  await newOTPuser.save();
  console.log("Saved OTP Record:", await OTPuser.findOne({ email }));
  sendOTP(fname, email, OTP);
};

export default handleOTP;
