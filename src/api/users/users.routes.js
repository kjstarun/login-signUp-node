import { Router } from "express";
import {authenticateUser, getUser, registerUser} from "./users.controller.js";

const authRouter = Router();

authRouter.post("/login", authenticateUser);
authRouter.post("/register", registerUser);
authRouter.get("/login", getUser);


export default authRouter;