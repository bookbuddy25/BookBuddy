import User from "../models/user.js";

async function addToCart(id, book_id) {
    try {
        await User.findByIdAndUpdate(id, { $push: { cart: book_id } });
        return { success: true, message: "Book added to cart" };
    } catch (error) {
        return { success: false, message: "Internal server error" }
    }
}

async function removeFromCart(id, book_id) {
    try {
        await User.findByIdAndUpdate(id, { $pull: { cart: book_id } });
        return { success: true, message: "Book removed from cart" };
    } catch (error) {
        return { success: false, message: "Internal server error" }
    }
}


export {
    addToCart,
    removeFromCart,
}