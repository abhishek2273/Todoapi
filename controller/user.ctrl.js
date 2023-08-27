import userModel from "../models/user.model.js";
import bcrypt from "bcrypt";
import { cookies } from "../utils/cookies.js";
import ErrorStatus from "../middlewares/error.js";

//Register
export const register = async (req, res, next) => {
    const { username, email, password } = req.body;
    const findUser = await userModel.findOne({ email });
    if (findUser) {
        return next(new ErrorStatus("User Already Exist ! Please Login", 400))
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    const user = await userModel.create({
        username,
        email,
        password: hashedPassword
    })
    cookies(user, res, "Registered successfully..", 201);
}

//Login
export const login = async (req, res, next) => {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email }).select("+password");
    if (!user)
        return next(new ErrorStatus("User not Exist! Please Register First", 400))

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
        return next(new ErrorStatus("Invalid email or password", 400))
    }
    cookies(user, res, `Welcome Back ${user.username}`, 201)
}

//User Profile
export const getMyProfile = (req, res) => {
    res.status(200).json({
        success: true,
        user: req.user,
    })
}

//Logout
export const logout = async (req, res) => {
    res.status(200)
        .cookie("token", "", {
            expires: new Date(Date.now()),
            sameSite: process.env.NODE_ENV == "Development" ? "lax" : "none",
            secure: process.env.NODE_ENV == "Development" ? false : true,

        })
        .json({
            success: true,
            message: "Logout Successfully !"
        })
}



