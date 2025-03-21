import User from "../models/user.js";

async function createUser(user) {
    try {

        const newUser = new User(user);
        await newUser.save();
        return { success: true, message: "Account Created Successfully" };

    } catch (error) {
        return { success: false, message: "Internal server error" }
    }
}

async function getUser(user_id) {
    try {
        const data = await User.findById(user_id).select("-password");
        return { success: true, data };
    } catch (error) {
        return { success: false, message: "Internal server error" }
    }
}

async function editAddress(user_id, address) {
    try {
        const data = await User.findByIdAndUpdate(user_id, { address: address });
        return { success: true, message: "Address updated successfuly" };
    } catch (error) {
        return { success: false, message: "Internal server error" }
    }
}

export {
    createUser,
    getUser,
    editAddress,
}