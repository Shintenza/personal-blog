import mongoose, { Schema } from "mongoose";

const articleSchema = mongoose.Schema({
  title: {
    type: String,
    require: true,
    unique: true,
    minLength: [5, "article title cannot be shorter than 5 characters"],
    maxLength: [80, "article title cannot be longer than 80 characters"]
  },
  content: {
    type: String,
    require: true,
    minLength: [10, "article cannot be shorter than 10 characters"],
  },
  image: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    minLength: [5, "article description cannot be shorter than 5 characters"],
    maxLength: [400, "article description cannot be longer than 400 characters"]
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
    require: true,
  },
  dateAdded: {
    type: Date,
    default: Date.now,
  },
  dateUpdated: {
    type: Date,
  },
});

const Article = new mongoose.model("Article", articleSchema);
export default Article;
