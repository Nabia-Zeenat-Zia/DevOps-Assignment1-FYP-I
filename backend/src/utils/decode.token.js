import { config } from "dotenv";
import jwt from "jsonwebtoken";

config();

const JWT_SECRET = process.env.JWT_SECRET;

const decodeToken = (token) => {
  return jwt.verify(token, JWT_SECRET);
};

export default decodeToken;
