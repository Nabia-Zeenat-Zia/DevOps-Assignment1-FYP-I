import { config } from "dotenv";
import jwt from "jsonwebtoken";

config();

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRY = process.env.JWT_EXPIRY;

const generateToken = (user_id) => {
  return jwt.sign({ user_id }, JWT_SECRET, { expiresIn: JWT_EXPIRY });
};

export default generateToken;
