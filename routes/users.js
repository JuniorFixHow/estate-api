import express from "express";
import { deleteUser, getAllUsers, getUser, updateUser } from "../controllers/userController.js";
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js";
//import User from "../models/User.js";
const router = express.Router();

//create
//router.post("/newuser", createEatate);

// router.get("/checkauth", verifyToken, (req, res, next)=>{
//     res.send("Welcome user! You are authenticated")
// })
// router.get("/checkuser/:id", verifyUser, (req, res, next)=>{
//     res.send("Welcome user! You are authenticated to delete your account")
// })
// router.get("/checkadmin/:id", verifyAdmin, (req, res, next)=>{
//     res.send("Welcome user! You are authenticated as an admin")
// })

//update
router.put("/:id", verifyUser, updateUser)

//delete
router.delete("/:id", verifyUser, deleteUser)
 
//get
router.get("/:id", verifyUser, getUser)

//getall
router.get("/", verifyAdmin, getAllUsers)

export default router;