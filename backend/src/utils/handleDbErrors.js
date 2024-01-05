import mongoose, { mongo } from "mongoose";

const handleDbErrors = (error, res) => {
  if (
    error instanceof mongoose.Error.CastError ||
    error instanceof mongoose.Error.ValidationError ||
    error instanceof mongo.MongoServerError
  ) {
    res.status(400);
    if (error.name == "MongoServerError" && error.code == 11000) {
      throw new Error("user with the given email already exists");
    }
    throw new Error(error.message);
  } else {
    res.status(500);
    console.log(error);
    throw new Error("sth went wrong");
  }
};

export default handleDbErrors;
