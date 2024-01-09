import ArticleForm from "@components/ArticleForm";
import { unstable_noStore as noStore } from "next/cache";

const getArticle = async (articleId) => {
  noStore();
  try {
    const response = await fetch(
      `${process.env.BACKEND_URL}/article/get/${articleId}`,
      { method: "GET" },
    );
    if (response.status == 200) {
      return await response.json();
    }
    return null;
  } catch {
    return null;
  }
};

const Page = async ({ searchParams }) => {
  const articleId = searchParams.id;
  const article = await getArticle(articleId);

  if (!article) {
    return (
      <h1 className="w-full text-center">
        The article with given ID does not exist :(
      </h1>
    );
  }
  return (
    <div className="page_padding">
      <ArticleForm existingArticle={article} />
    </div>
  );
};
export default Page;
