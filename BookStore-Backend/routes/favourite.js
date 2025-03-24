import express from "express";
const router = express.Router();
import { authenticateToken } from "../middleware/userAuth.js";
import { addBookToFavourite, getFavouriteBooks, removeBookFromFavourite } from "../services/favouriteService.js";

// add book to favourite
router.put("/add-favourite", authenticateToken, addBookToFavourite)

// delete book from favourite
router.put("/remove-favourite", authenticateToken, removeBookFromFavourite)

// get book from favourite
router.get("/get-favourite-books", authenticateToken, getFavouriteBooks)

export default router