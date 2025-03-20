import STATUS from '../utlis/responseCode.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config()

const authenticateToken = async (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(" ")[1];

    if(token === null) {
        return res.status(STATUS.UNAUTHORIZED).json({ message: "Authentication token required" });
    }

    jwt.verify(token, process.env.SECRET_KEY, function(err, user) {
        if(err) {
            return res.status(STATUS.FORBIDDEN).json({ message: "Token expired. Please signin again !" });
        }

        req.user = user;
        next();
    })
}

export { 
    authenticateToken 
};
