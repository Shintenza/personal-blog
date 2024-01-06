import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/User.js";
import handleDbErrors from "../utils/handleDbErrors.js";

const generateToken = (userId, role) => {
  return jwt.sign({ userId, role }, process.env.JWT_SECRET, {
    expiresIn: "10d",
  });
};

const postRegister = asyncHandler(async (req, res) => {
  const { firstName, lastName, username, password, email } = req.body;

  if (!password || password.length < 4) {
    res.status(400);
    throw new Error("password length cannot be smaller than 4 characters");
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = {
    firstName,
    lastName,
    email,
    username,
    password: hashedPassword,
  };

  try {
    const dbUser = await User.create(user);
    const { password, ...response } = user;
    res.status(201);
    res.json({
      _id: dbUser.id,
      token: generateToken(dbUser.id, dbUser.role),
      role: dbUser.role,
      ...response,
    });
  } catch (error) {
    handleDbErrors(error, res);
  }
});

const postLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error("missing login credentials");
  }

  const user = await User.findOne({ email });
  if (user && (await bcrypt.compare(password, user.password))) {
    const token = generateToken(user.id, user.role);
    res.cookie("token", token, {
      maxAge: 10 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    res.status(200);
    res.json({
      _id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username,
      role: user.role,
      token,
    });
  } else {
    res.status(400);
    throw new Error("wrong email or password");
  }
});

export { postRegister, postLogin };
