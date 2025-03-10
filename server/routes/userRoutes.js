import express from "express";
import userAuth from "../middlewares/auth.js";
import { registerUser, loginUser, userCredits } from "../controllers/userController.js";
const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.post("/credits", userAuth ,userCredits);


export default userRouter;


// https://localhost:4000/api/user/register
// https://localhost:4000/api/user/login