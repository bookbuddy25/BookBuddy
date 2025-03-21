import STATUS from "../utlis/responseCode.js";
import User from '../models/user.js'
import dotenv from 'dotenv';
import { createNewBook, deleteBookById, updateBookById } from "../controller/bookController.js";
import mongoose from "mongoose";
dotenv.config()

async function createBook(req, res) {
    const { id } = req.headers;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(STATUS.BAD_REQUEST).json({ message: "Invalid user ID" });
    }

    try {
        const user = await User.findById(id);
    
        console.log("user_id", user)
        if(user.role !== "admin") {
            return res.status(STATUS.UNAUTHORIZED).json({ message: "Unauthoried access. Please try again !" })
        }
        
        if(!req.body.url || !req.body.title || !req.body.price || !req.body.description || !req.body.language) {
            return res.status(STATUS.BAD_REQUEST).json({ message: "Please provide all the details" })
        }
        
        const data = await createNewBook(req.body);
        
        if(data.success) {
            return res.status(STATUS.SUCCESS).json({ message: data.message });
        }
            
    } catch (error) {
        return res.status(STATUS.SERVER_ERROR).json({ message: "Internal server error" });
    }
}

async function updateBook(req, res) {
    
    try {
        const { book_id } = req.headers;
    
        if(!req.body.url || !req.body.title || !req.body.price || !req.body.description || !req.body.language) {
            return res.status(STATUS.BAD_REQUEST).json({ message: "Please provide all the details" })
        }
        
        const data = await updateBookById(book_id, req.body);
        
        if(data.success) {
            return res.status(STATUS.SUCCESS).json({ message: data.message });
        }
            
    } catch (error) {
        return res.status(STATUS.SERVER_ERROR).json({ message: "An error occurred" });
    }
}

async function deleteBook(req, res) {
    
    try {
        const { book_id } = req.headers;
    
        const data = await deleteBookById(book_id);
        
        if(data.success) {
            return res.status(STATUS.SUCCESS).json({ message: data.message });
        }
            
    } catch (error) {
        return res.status(STATUS.SERVER_ERROR).json({ message: "An error occurred" });
    }
}

export {
    createBook,
    updateBook,
    deleteBook,
}