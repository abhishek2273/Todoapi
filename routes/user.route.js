import express from "express";
import {
    register,
    login,
    getMyProfile,
    logout,
} from "../controller/user.ctrl.js"
import { isAuthenticated } from "../middlewares/auth.js";

const userRouter = express.Router()

userRouter.post("/register", register)
userRouter.post("/login", login)
userRouter.get("/me", isAuthenticated, getMyProfile)
userRouter.get("/logout", logout)

export default userRouter;