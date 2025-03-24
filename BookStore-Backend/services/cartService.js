import STATUS from "../utlis/responseCode.js";
import User from '../models/user.js'
import { addToCart, removeFromCart } from "../controller/cartController.js";

async function addBookToCart(req, res) {
    try {
        const { book_id, id } = req.headers;
        const userData = await User.findById(id);
        const isBookInCart = userData.cart.includes(book_id);

        if(isBookInCart) {
            return res.status(STATUS.SUCCESS).json({ message: "Book is already in cart" })
        }

        const data = await addToCart(id, book_id);
        
        if(data.success) {
            return res.status(STATUS.SUCCESS).json({ message: data.message });
        }
            
    } catch (error) {
        return res.status(STATUS.SERVER_ERROR).json({ message: "An error occurred" });
    }
}

async function removeBookFromCart(req, res) {
    try {
        const { book_id } = req.params;
        const { id } = req.headers;
        const userData = await User.findById(id);
        const isBookInCart = userData.cart.includes(book_id);

        if(!isBookInCart) {
            return res.status(STATUS.BAD_REQUEST).json({ success: false, message: "Cannot remove book from cart" });
        }

        const data = await removeFromCart(id, book_id);

        if(data.success) {
            return res.status(STATUS.SUCCESS).json({ success: data.success, message: data.message });
        }
        

    } catch (error) {
        return res.status(STATUS.SERVER_ERROR).json({ success: false, message: "An error occurred" });
    }
}

async function getCartItems(req, res) {
    try {
        const { id } = req.headers;
        const cartData = await User.findById(id).populate("cart");
        return res.status(STATUS.SUCCESS).json({ message: cartData.cart.reverse() });
    } catch (error) {
        return res.status(STATUS.SERVER_ERROR).json({ message: "An error occurred" });
    }
}

export {
    addBookToCart,
    removeBookFromCart,
    getCartItems,
}
