import Mongoose from "mongoose";

const UserSchema = new Mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
      unique: true,
      validate: /^(?!.*\s)[^\s]+$/,
    },
    password: {
      type: String,
      required: true,
      validate:
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{9,29}$/,
    },
  },
  { timestamps: true }
);

const userModel = Mongoose.model("Users", UserSchema);
export default userModel;
