import * as dotenv from "dotenv";
dotenv.config();

export const JWT_KEY = process.env.JWT_SECRET_KEY;
