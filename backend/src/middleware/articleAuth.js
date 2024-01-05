import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/User.js";

const articleAuth = asyncHandler(async (req, res, next) => {
  let token = "";
  let user = null;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

      user = await User.findById(decodedToken.userId).select("-password");
    } catch (error) {
      res.status(401);
      throw new Error("not authorized");
    }
  }

  if (!token || !user) {
    res.status(401);
    throw new Error("not authorized");
  }

  if (user.role != "author") {
    res.status(403);
    throw new Error("you don't have permission to do this");
  }
  req.user = user;
  next();
});

export default articleAuth;
