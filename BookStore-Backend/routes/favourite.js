import express from "express";
const router = express.Router();
import { authenticateToken } from "../middleware/userAuth.js";
import { addBookToFavourite, getFavouriteBooks, removeBookFromFavourite } from "../services/favouriteService.js";

// add book to favourite
router.put("/add-favourite", authenticateToken, addBookToFavourite)

// delete book from favourite
router.delete("/remove-favourite", authenticateToken, removeBookFromFavourite)

// delete book from favourite
router.delete("/get-favourite-books", authenticateToken, getFavouriteBooks)

export default router