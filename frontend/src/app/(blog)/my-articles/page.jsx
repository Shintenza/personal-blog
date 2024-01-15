import ArticleList from "@components/ArticleList";
import Pagination from "@components/Pagination";
import { unstable_noStore as noStore} from "next/cache";
import { cookies } from "next/headers";

const BACKEND_URL = "http://localhost:8080";
const fetchUserArticles = async (currentPage) => {
  noStore();
  const cookieStore = cookies();
  try {
    const response = await fetch(
      `${BACKEND_URL}/article/user-articles?page=${currentPage}`,
      {
        credentials: "include",
        method: "GET",
        headers: {
          Cookie: `token = ${cookieStore.get("token").value}`,
        },
      },
    );
    if (response.status == 200) {
      return await response.json();
    }
  } catch (error) {
    return [];
  }
};

const Page = async ({ searchParams }) => {
  const currentPage = Number(searchParams.page) || 1;
  const { articles, total } = await fetchUserArticles(currentPage);

  return (
    <div>
      <h1 className="text-6xl mb-8">Your articles</h1>
      <ArticleList articles={articles} />
      <Pagination totalPages={total}/>
    </div>
  );
};

export default Page;
