import express from "express";
import { postRegister, postLogin } from "../controllers/userController.js";


const router = express.Router();

router.post("/register", postRegister);
router.post("/login", postLogin);

export default router;
