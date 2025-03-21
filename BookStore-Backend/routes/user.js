import express from "express";
const router = express.Router();
import { createAccount, getUserDetail, loginAccount, updateAddress } from "../services/userService.js";
import { authenticateToken } from "../middleware/userAuth.js";

// Signup
router.post("/sign-up", createAccount);

// Signin
router.post("/sign-in", loginAccount);

// get user information
router.get("/get-user-information", authenticateToken, getUserDetail);

// get user information
router.put("/update-address", authenticateToken, updateAddress);

export default router; 