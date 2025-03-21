import express from "express";
const router = express.Router();
import { adminAuthenticateToken } from "../middleware/adminAuth.js";
import { createBook, deleteBook, getAllBooks, getBookDetail, updateBook } from "../services/bookService.js";

// add book --admin
router.post("/add-book", adminAuthenticateToken, createBook)

// update book --admin
router.put("/update-book", adminAuthenticateToken, updateBook)

// delete book --admin
router.delete("/delete-book", adminAuthenticateToken, deleteBook)

// get book list
router.get("/get-all-book", getAllBooks)

// get book by Id
router.get("/get-book-detail/:id", getBookDetail)

export default router; 