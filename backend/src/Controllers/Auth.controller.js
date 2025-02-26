import User from "../Models/User.js";
import UserOTP from "../Models/UserOTP.js";
import generateHash from "../utils/generate.hash.js";
import comparePassword from "../utils/compare.password.js";
import generateToken from "../utils/generate.token.js";
import decodeToken from "../utils/decode.token.js";
import extractToken from "../utils/extact.token.js";
import handleOTP from "../utils/generate.otp.js";

export const register = async (req, res) => {
  const { fname, lname, email, password, contact } = req.body;

  try {
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ error: "User already exists" });
    }

    const newUser = new User({
      fname,
      lname,
      email,
      password: await generateHash(password),
      contact,
    });
    await newUser.save();

    return res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "User does not exist" });
    }

    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const token = generateToken(user._id);
    const userData = {
      fname: user.fname,
      lname: user.lname,
      profile_image: user.profile_image,
    };
    return res
      .status(200)
      .json({ message: "User logged in successfully", token, user: userData });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const verifyToken = async (req, res) => {
  try {
    const token = extractToken(req);
    const decoded = decodeToken(token);

    const user = await User.findById(decoded.user_id).select(
      "fname lname profile_image"
    );
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.status(200).json({ valid: true, user });
  } catch (error) {
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ error: "Invalid token" });
    } else if (error.name === "TokenExpiredError") {
      return res.status(401).json({ error: "Token has expired" });
    }

    return res.status(500).json({ error: error.message });
  }
};

export const sendOTP = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    await handleOTP(user.fname, email);
    return res.status(200).json({
      message: "OTP sent to email",
    });
  } catch (error) {
    console.error("OTP validation error:", error);
    return res.status(500).json({
      message: "Error during OTP validation.",
      error: error.message,
    });
  }
};

export const verifyOTP = async (req, res) => {
  const { email, otp } = req.body;
  try {
    const userOTP = await UserOTP.findOne({ email });
    if (!userOTP) {
      return res.status(400).json({ message: "Invalid OTP or Email." });
    }

    if (userOTP.otp !== otp) {
      return res.status(400).json({ message: "Incorrect OTP." });
    }

    if (new Date() > userOTP.expiry) {
      return res.status(400).json({ message: "OTP has expired." });
    }

    return res.status(200).json({
      message: "OTP verified successfully.",
    });
  } catch (error) {
    console.error("OTP verification error:", error);
    return res.status(500).json({
      message: "Error during OTP verification.",
      error: error.message,
    });
  }
};

export const resetPassword = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found." });
    }

    user.password = await generateHash(password);
    await user.save();

    return res.status(200).json({
      message: "Password reset successfully.",
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
