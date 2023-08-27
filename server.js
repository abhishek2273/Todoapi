import { app } from "./route.js";
import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config();

// Database configuration & PORT
const PORT = process.env.PORT;
mongoose.connect(process.env.MongoDB, {
    dbName: "todo"
})
    .then(() => console.log("Database is Connected"))
    .catch((e) => console.log(e));

// server listening
app.listen(PORT, () => {
    console.log(`server is run at ${PORT}`);
})