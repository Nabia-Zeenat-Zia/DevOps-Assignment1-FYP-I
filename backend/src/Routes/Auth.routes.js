import express from "express";
import * as authController from "../Controllers/Auth.controller.js";

const authRouter = express.Router();

authRouter.post("/register", authController.register);
authRouter.post("/login", authController.login);
authRouter.post("/verify", authController.verifyToken);
authRouter.post("/send", authController.sendOTP);
authRouter.post("/verify-otp", authController.verifyOTP);
authRouter.post("/forgot-password", authController.resetPassword);
authRouter.post("/reset-password", authController.resetPassword);

export default authRouter;
