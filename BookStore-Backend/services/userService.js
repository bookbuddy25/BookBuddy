import STATUS from "../utlis/responseCode.js";
import User from "../models/user.js";
import bcrypt from "bcryptjs";
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { createUser, editAddress, getUser } from "../controller/userController.js";
dotenv.config()

const SALT = parseInt(process.env.SALT_ROUND);

async function createAccount(req, res) {
    const  { username, email, password, address } = req.body
        
    // check username length is more than 3
    if(username.length < 4) {
        return res.status(STATUS.BAD_REQUEST).send("Username length should be greater than 3")
    }

    // check username already exist
    const isUserValid = await User.findOne({ username })
    if(isUserValid) {
        return res.status(STATUS.BAD_REQUEST).send("Username already exist")
    }

    // check username already exist
    const isEmailValid = await User.findOne({ email })
    if(isEmailValid) {
        return res.status(STATUS.BAD_REQUEST).send("Email already exist")
    }

    if(password.length < 6) {
        return res.status(STATUS.BAD_REQUEST).json({ message:"Password should be atleast 6 character" })
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, SALT);

    let user = req.body?.role ? 
        { username, email, password: hashedPassword, address, role: req.body?.role } : 
        { username, email, password: hashedPassword, address };

    const newUser = await createUser(user);

    if(!newUser.success) {
        return res.status(STATUS.SERVER_ERROR).json({ message: newUser.message });
    }

    return res.status(STATUS.SUCCESS).json({ message: newUser.message })
}

async function loginAccount(req, res) {
    try {
        const  { username, password } = req.body;

        // check username already exist
        const existUser = await User.findOne({ username });
        if(!existUser) {
            return res.status(STATUS.BAD_REQUEST).json({ message: "Invalid Username or Passsword try again !" });
        }

        // Hash the password
        bcrypt.compare(password, existUser.password, function(err, data) {
            if(data) {
                const authClaims = {
                    name: existUser.username,
                    role: existUser.role,
                };
                const token  = jwt.sign(authClaims, process.env.SECRET_KEY, { expiresIn: "30d" });
                return res.status(STATUS.SUCCESS).json({ id: existUser.id, role: existUser.role, token });
            } else {
                return res.status(STATUS.BAD_REQUEST).json({ message: "Invalid Username or Passsword try again !" });
            }
        });

    } catch (error) {
        res.status(STATUS.SERVER_ERROR).json({ message: "Internal server error" });
    }
}

async function getUserDetail(req, res) {
    const  { id } = req.headers;

    if(!id) {
        return res.status(STATUS.BAD_REQUEST).json({ message: "Please provide the id" });
    }

    // check username already exist
    const data = await getUser(id);

    if(!data.success) {
        return res.status(STATUS.SERVER_ERROR).json({ message: "Internal server error" });
    }

    return res.status(STATUS.SUCCESS).json(data.data);
}

async function updateAddress(req, res) {

    const { id } = req.headers;
    const { address } = req.body;

    if(!address || address.length < 3) {
        return res.status(STATUS.BAD_REQUEST).json({ message: "Internal server error" });
    }

    // check username already exist
    const data = await editAddress(id, address);

    if(!data.success) {
        return res.status(STATUS.SERVER_ERROR).json({ message: "Internal server error" });
    }

    return res.status(STATUS.SUCCESS).json({ message: "Address updated successfully" });
}

export {
    createAccount,
    loginAccount,
    getUserDetail,
    updateAddress,
}