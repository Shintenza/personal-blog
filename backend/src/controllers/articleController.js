import asyncHandler from "express-async-handler";
import mongoose from "mongoose";
import Article from "../models/Article.js";
import User from "../models/User.js";
import handleDbErrors from "../utils/handleDbErrors.js";

const postAddArticle = asyncHandler(async (req, res) => {
  const { title, content, description } = req.body;
  const authorId = req.user._id;
  const imageFile = req.file;

  if (!imageFile) {
    res.status(400);
    throw new Error("missing blog post image");
  }

  const article = {
    title,
    content,
    image: imageFile.filename,
    description,
    author: new mongoose.Types.ObjectId(authorId),
  };

  try {
    const dbArticle = await Article.create(article);
    res.status(201);
    res.json({
      _id: dbArticle.id,
      ...article,
    });
  } catch (error) {
    handleDbErrors(error, res);
  }
});

const putUpdateArticle = asyncHandler(async (req, res) => {
  const articleId = req.params.id;

  if (!articleId) {
    res.status(400);
    throw new Error("missing article id");
  }

  const { title, content, description } = req.body;
  const imageFile = req.file;

  const newData = {
    title,
    content,
    description,
    dateUpdated: new Date(),
  };

  if (imageFile) {
    newData.image = imageFile.path;
  }

  let updatedArticle = null;

  try {
    updatedArticle = await Article.findOneAndUpdate(
      { _id: articleId },
      { $set: newData },
      { new: true, runValidators: true },
    );

    res.status(201);
    res.json(updatedArticle);
  } catch (error) {
    handleDbErrors(error, res);
  }

  if (!updatedArticle) {
    res.status(400);
    throw new Error("article with the given id does not exits");
  }
});

const deleteArticle = asyncHandler(async (req, res) => {
  const articleId = req.params.id;
  if (!articleId) {
    res.status(400);
    throw new Error("missing article id");
  }

  try {
    const article = await Article.findByIdAndDelete(articleId);
    res.status(200);
    res.json({ message: "ok" });
  } catch (error) {
    handleDbErrors(error, res);
  }
});

const PAGE_SIZE = 4;

const getArticles = asyncHandler(async (req, res) => {
  const page = req.query.page ? Number(req.query.page) : 1;
  const skip = (page - 1) * PAGE_SIZE;

  try {
    const articles = await Article.find()
      .sort({ dateAdded: -1 })
      .skip(skip + 1)
      .limit(PAGE_SIZE)
      .populate({
        path: "author",
        select: "firstName lastName image",
        model: User,
      })
      .lean();
    const total = await Article.countDocuments();

    res.status(200);
    res.json({ articles, total: Math.ceil(total / PAGE_SIZE), page });
  } catch (error) {
    handleDbErrors(error, res);
  }
});

const getLastArticle = asyncHandler(async (req, res) => {
  try {
    const lastArticle = await Article.findOne()
      .select("-content -author")
      .sort({ dateAdded: -1 });
    res.status(200);
    res.json(lastArticle);
  } catch (error) {
    handleDbErrors(error);
  }
});

export {
  postAddArticle,
  putUpdateArticle,
  deleteArticle,
  getArticles,
  getLastArticle,
};
