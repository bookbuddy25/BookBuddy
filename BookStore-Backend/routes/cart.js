import express from "express";
const router = express.Router();
import { authenticateToken } from "../middleware/userAuth.js";
import { addBookToCart, getCartItems, removeBookFromCart } from "../services/cartService.js";

// add book to cart
router.put("/add-to-cart", authenticateToken, addBookToCart)

// remove book to cart
router.put("/remove-cart/:book_id", authenticateToken, removeBookFromCart)

// get cart
router.get("/get-user-cart", authenticateToken, getCartItems)


export default router; 