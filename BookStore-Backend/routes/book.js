import express from "express";
const router = express.Router();
import { adminAuthenticateToken } from "../middleware/adminAuth.js";
import { createBook, deleteBook, updateBook } from "../services/bookService.js";

// add book --admin
router.post("/add-book", adminAuthenticateToken, createBook)

// update book --admin
router.put("/update-book", adminAuthenticateToken, updateBook)

// delete book --admin
router.delete("/delete-book", adminAuthenticateToken, deleteBook)

export default router; 