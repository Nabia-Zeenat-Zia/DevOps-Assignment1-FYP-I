import mongoose from "mongoose";

const schema = mongoose.Schema;
const otpSchema = new schema({
  email: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
    required: true,
  },
  expiry: {
    type: Date,
    required: true,
  },
});

otpSchema.index({ expiry: 1 }, { expireAfterSeconds: 0 });
const OTPuser = mongoose.model("OTPuser", otpSchema);

export default OTPuser;
