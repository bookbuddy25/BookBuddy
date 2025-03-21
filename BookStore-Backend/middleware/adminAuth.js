import STATUS from '../utlis/responseCode.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config()

const adminAuthenticateToken = async (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(" ")[1];

    if(token === null) {
        return res.status(STATUS.UNAUTHORIZED).json({ message: "Authentication token required" });
    }

    jwt.verify(token, process.env.SECRET_KEY, function(err, user) {
        if(err) {
            return res.status(STATUS.FORBIDDEN).json({ message: "Token expired. Please signin again !" });
        }

        if(user.role !== "admin") {
            return res.status(STATUS.UNAUTHORIZED).json({ message: "Unauthoried access. Please try again !" })
        }
        
        req.decoded = user;
        next();
    })
}

export { 
    adminAuthenticateToken 
};
