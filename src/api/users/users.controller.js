import userModel from "./users.model.js";
import bcrypt from "bcrypt";
import {
  createAccessToken,
  verifyToken,
} from "../../services/JWT/jwt.provider.js";

const projectionData = { createdAt: 0, updatedAt: 0, __v: 0 };

export const registerUser = async (req, res) => {
  try {
    const bodyData = { ...req.body };
    console.log("body", bodyData);
    if (!bodyData)
      return res.send({ message: "Invalid credentials from body" });

    const { userName, password } = bodyData;
    const checkNewUser = await userModel.findOne({ userName });

    if (checkNewUser)
      return res.send({ message: "This username already exists" });

    const encryptPassword = await bcrypt.hash(password, 10);
    const newUser = new userModel({
      userName,
      password: encryptPassword,
    });
    const saveUser = await newUser.save();
    res.send({ message: saveUser });
  } catch (error) {
    res.send({ message: error });
  }
};

export const authenticateUser = async (req, res) => {
  try {
    const bodyData = { ...req.body };
    console.log("body", bodyData);
    if (!bodyData)
      return res.send({ message: "Invalid credentials from body" });

    const { userName, password } = bodyData;

    const ifUserExists = await userModel.findOne({ userName });

    console.log("user", ifUserExists);

    if (!ifUserExists) return res.send({ message: "User doesn't exists" });

    const isUserAuthenticated = await bcrypt.compare(
      password,
      ifUserExists.password
    );
    console.log("authenticate", isUserAuthenticated);

    if (isUserAuthenticated) {
      const userId = ifUserExists._id;
      const JWT_ACCESS_TOKEN = createAccessToken({ userId });
      return res.send({ JWT_ACCESS_TOKEN });
    }

    res.send({ message: "Incorrect password" });
  } catch (error) {
    res.send({ message: error });
  }
};

export const getUser = (req, res) => {
  const { authorization } = req.headers;

  const isValidToken = verifyToken(authorization);
  console.log("invalid",isValidToken);
  if (!isValidToken) return res.send("Access denied from get request");

  console.log("result", isValidToken);
  res.send({ result: isValidToken });
};
