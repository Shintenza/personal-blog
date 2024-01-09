"use server";

const { revalidatePath } = require("next/cache");

const revalidateArticle = (articleId) => {
  revalidatePath(`/article/${articleId}`);
};

export { revalidateArticle };
