import ErrorStatus from "../middlewares/error.js";
import taskModel from "../models/task.model.js";

//New Task
export const newTask = async (req, res, next) => {
    try {
        const { title, description } = req.body
        await taskModel.create({
            title,
            description,
            user: req.user,
        })
        res.status(201).json({
            success: true,
            message: "task added successfully"
        })
    } catch (error) {
        next(error)
    }
}

//get all task
export const allTask = async (req, res) => {
    try {
        const userid = req.user._id;
        const task = await taskModel.find({ user: userid })

        res.status(201).json({
            success: true,
            message: "Here your all tasks",
            tasks: task,
        })
    } catch (error) {
        next(error)
    }
}

//update a task
export const updateTask = async (req, res, next) => {
    try {
        const id = req.params.id;

        const task = await taskModel.findById(id);

        if (!task)
            return next(new ErrorStatus("Invalid id ! not updated", 404))

        task.isComplete = !task.isComplete;
        await task.save();


        res.status(201).json({
            success: true,
            message: "Task updated"
        })
    } catch (error) {
        next(error);
    }
}

//delete a  task
export const deleteTask = async (req, res, next) => {

    try {
        const task = await taskModel.findById(req.params.id);
        if (!task)
            return next(new ErrorStatus())

        await task.deleteOne();

        res.status(201).json({
            success: true,
            message: "Task Deleted Successfully"
        })
    } catch (error) {
        next(error)
    }
}


