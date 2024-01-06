import ArticleGrid from "@components/ArticleGrid";
import LastArticle from "@components/LastArticle";
import Image from "next/image";
import { unstable_noStore as noStore } from "next/cache";
import Pagination from "@components/Pagination";
import Search from "@components/Search";

const getArticles = async (currentPage, searchQuery) => {
  noStore();
  const params = new URLSearchParams();
  params.set("page", currentPage);
  params.set("query", searchQuery);
  const respone = await fetch(
    `${process.env.BACKEND_URL}/article?${params.toString()}`,
  );

  const responseBody = await respone.json();
  return responseBody;
};

const Home = async ({ searchParams }) => {
  const currentPage = Number(searchParams.page) || 1;
  const searchQuery = searchParams.query || "";

  const { articles, total: totalNumberOfPages } = await getArticles(
    currentPage,
    searchQuery,
  );
  return (
    <main className="page_padding">
      <LastArticle />
      <div className="flex justify-between items-center mb-16">
        <h1 className="text-6xl font-bold" id="header">
          More stories...
        </h1>
        <Search placeholder="Search for an article..." />
      </div>
      <ArticleGrid articles={articles} />
      <Pagination totalPages={totalNumberOfPages} />
    </main>
  );
};

export default Home;
