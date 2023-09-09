import express from "express";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.route.js";
import taskRouter from "./routes/task.route.js";
import { errorHandle } from "./middlewares/error.js";
import cors from "cors";


export const app = express();

// middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    withCredentials: true,
}))

//Routes
app.use("/api/v1/users", userRouter)
app.use("/api/v1/tasks", taskRouter)

app.get("/", (req, res) => {
    res.send("TO DO APP");
})

//Error Handler
app.use(errorHandle)
