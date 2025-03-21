import User from "../models/user.js";

async function addToFavourite(id, book_id) {
    try {
        await User.findByIdAndUpdate(id, { $push: { favourites: book_id } });
        return { success: true, message: "Book added to favourite" };
    } catch (error) {
        return { success: false, message: "Internal server error" }
    }
}

async function removeFavourite(id, book_id) {
    try {
        await User.findByIdAndUpdate(id, { $pull: { favourites: book_id } });
        return { success: true, message: "Book removed from favourite" };
    } catch (error) {
        return { success: false, message: "Internal server error" }
    }
}

async function getFavouriteList(id) {
    try {
        const userData = await User.findById(id).populate("favourites");
        return { success: true, data: userData.favourites };
    } catch (error) {
        return { success: false, message: "Internal server error" }
    }
}

export {
    addToFavourite,
    removeFavourite,
    getFavouriteList,
}