import express from "express";
import {
    allTask,
    newTask,
    deleteTask,
    updateTask,
} from "../controller/task.ctrl.js"
import { isAuthenticated } from "../middlewares/auth.js";

const taskRouter = express.Router()

taskRouter.get("/tasks", isAuthenticated, allTask)
taskRouter.post("/new", isAuthenticated, newTask)
taskRouter
    .route("/:id")
    .put(isAuthenticated, updateTask)
    .delete(isAuthenticated, deleteTask)

export default taskRouter;