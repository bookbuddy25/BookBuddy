import express from "express";
const router = express.Router();
import { authenticateToken } from "../middleware/userAuth.js";

// add book --admin
router.post("/add-to-cart", authenticateToken, createBook)


export default router; 