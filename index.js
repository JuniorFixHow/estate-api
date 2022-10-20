import express from "express";
import mongoose  from "mongoose";
import Connect from "./Db.js";
import authRoute from "./routes/auth.js";
import estateRoute from "./routes/estates.js";
import cookieParser from "cookie-parser";
import userRoute from "./routes/users.js";
import buildingRoute from "./routes/buildings.js";
import cors from "cors";


const app = express();
Connect();
mongoose.connection.on("disconnected", ()=>{

    console.log("Mongo disconnected");
})
mongoose.connection.on("connected", ()=>{

    console.log("Mongo is back!");
})

//middlewares
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/estates", estateRoute);
app.use("/api/users", userRoute);
app.use("/api/buildings", buildingRoute);

app.use((err, req, res, next)=>{
    const errorStatus = err.status ||500;
    const errorMessage = err.message || "Something went wrong!"
    return res.status(errorStatus).json({
        success:false,
        status:errorStatus,
        message:errorMessage,
        stack: err.stack
    });
})
const port = process.env.PORT || 5000;
app.listen(port,()=>{
    console.log(`Server is listening on port ${port}`);
})