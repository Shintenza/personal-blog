import express from "express";
import "dotenv/config.js";
import cors from 'cors';

import errorHandler from "./middleware/errorHandler.js";
import connectDB from "./utils/connectDB.js";
import userRoutes from "./routes/userRoutes.js";
import articleRoutes from "./routes/articleRoutes.js";
import createUploadsDir from "./utils/createUploadsDir.js";

const port = process.env.PORT | 8080;

createUploadsDir();
connectDB();
const app = express();
app.use(cors());

app.use(express.json());
app.use(express.static(process.env.STORAGE));

app.use("/user", userRoutes);
app.use("/article", articleRoutes);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`I am up and running on port ${port}`);
});
