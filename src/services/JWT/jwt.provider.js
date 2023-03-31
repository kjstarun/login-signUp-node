import jwt from "jsonwebtoken";
import { JWT_KEY } from "./jwt.config.js";

export const createAccessToken = (payload) => {
  if (!payload) return false;
  const accessToken = jwt.sign(payload, JWT_KEY);
  return accessToken;
};

export const verifyToken = (accessToken) => {
  try {
    const isVerified = jwt.verify(accessToken, JWT_KEY);
    return isVerified;
  } catch (error) {
    return false;
  }
};
