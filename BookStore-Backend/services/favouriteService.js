import STATUS from "../utlis/responseCode.js";
import User from '../models/user.js'
import dotenv from 'dotenv';
import { addToFavourite, removeFavourite } from "../controller/favouriteController.js";
dotenv.config()

async function addBookToFavourite(req, res) {
    try {
        const { id, book_id } = req.headers;
        const userData = await User.findById(id);
        const isBookFavourite = userData.favourites.includes(book_id);

        if(isBookFavourite) {
            return res.status(STATUS.SUCCESS).json({ message: "Book is already in favourites" })
        }

        const data = await addToFavourite(id, book_id);
        
        if(data.success) {
            return res.status(STATUS.SUCCESS).json({ message: data.message });
        }
            
    } catch (error) {
        return res.status(STATUS.SERVER_ERROR).json({ message: "An error occurred" });
    }
}

async function removeBookFromFavourite(req, res) {
    try {
        const { id, book_id } = req.headers;
        const userData = await User.findById(id);
        const isBookFavourite = userData.favourites.includes(book_id);

        if(isBookFavourite) {
            const data = await removeFavourite(id, book_id);

            if(data.success) {
                return res.status(STATUS.SUCCESS).json({ message: data.message });
            }
        } 

    } catch (error) {
        return res.status(STATUS.SERVER_ERROR).json({ message: "An error occurred" });
    }
}

async function getFavouriteBooks(req, res) {
    try {
        const { id } = req.headers;
        const res = await getFavouriteList(id);

        if(res.success) {
            return res.status(STATUS.SUCCESS).json({ message: res.data });
        }

    } catch (error) {
        return res.status(STATUS.SERVER_ERROR).json({ message: "An error occurred" });
    }
}

export {
    addBookToFavourite,
    removeBookFromFavourite,
    getFavouriteBooks,
}