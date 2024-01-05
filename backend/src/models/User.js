import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  firstName: {
    type: String,
    require: true,
    minLength: [2, "first name should contain at least 2 characters"],
    match: [/^[a-z ,.'-]+$/i, "you are using not allowed characters"],
  },
  lastName: {
    type: String,
    require: true,
    minLength: [2, "last name should contain at least 2 characters"],
    match: [/^[a-z ,.'-]+$/i, "you are using not allowed characters"],
  },
  email: {
    type: String,
    require: true,
    unique: true,
    match: [
      /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
      "Please enter a valid email address",
    ],
  },
  role: {
    type: String,
    require: true,
    default: "user",
    enum: ["user", "author"],
  },
  username: {
    type: String,
    require: true,
    minLength: [3, "username should contain at least 3 characters"],
    match: [
      /^[\w\d\s]+$/,
      "Alphanumeric string that may include _ and - having a length of 3 to 16 characters is allowed",
    ],
  },
  password: {
    type: String,
    require: true,
  },
});

const User = new mongoose.model("User", userSchema);
export default User;
