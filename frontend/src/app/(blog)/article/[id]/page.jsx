import formatDate from "@utils/formatDate";
import Image from "next/image";
import { notFound } from "next/navigation";

const getArticle = async (articleId) => {
  try {
    const response = await fetch(
      `${process.env.BACKEND_URL}/article/get/${articleId}`,
    );
    if (response.status == 200) {
      return await response.json();
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
};

const Page = async ({ params }) => {
  const article = await getArticle(params.id);

  if (!article) {
    notFound();
  }
  return (
    <div className="page_padding">
      <article>
        <div className="h-[80vh] relative">
          <Image
            src={`${process.env.BACKEND_URL}/${article.image}`}
            fill
            alt="article image"
            className="object-cover"
          />
        </div>

        <h1 className="text-6xl mt-10 mb-4">{article.title}</h1>
        <span className="block font-light mb-6">{formatDate(article.dateAdded)}</span>
        <p className="mb-10 leading-7">{article.content}</p>
      </article>
    </div>
  );
};

export default Page;
