import express, { json } from "express";
import {PORT} from "./config.js";
import authRouter from "./src/api/users/users.routes.js";
import {connectDB} from "./src/services/connectDB.js";

const app = express();
connectDB()

app.use(json());

app.use("/auth", authRouter);

app.listen(PORT, () => {
  console.log(`App running successfuly on${PORT}`);
});
