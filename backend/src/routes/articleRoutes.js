import express from "express";

import {
  postAddArticle,
  putUpdateArticle,
  deleteArticle,
  getArticles,
  getLastArticle
} from "../controllers/articleController.js";
import articleAuth from "../middleware/articleAuth.js";
import multer from "multer";

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, process.env.STORAGE);
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

const router = express.Router();

router.post("/add", articleAuth, upload.single("image"), postAddArticle);
router.put(
  "/update/:id",
  articleAuth,
  upload.single("image"),
  putUpdateArticle,
);
router.delete("/delete/:id", articleAuth, deleteArticle);
router.get("/", getArticles);
router.get("/last", getLastArticle);



export default router;
