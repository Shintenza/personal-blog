"use client";
import formatDate from "@utils/formatDate";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

const BACKEND_URL = "http://localhost:8080";

const ArticleListCard = ({ image, title, description, dateAdded, id }) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const deleteArticle = async () => {
    const response = await fetch(`${BACKEND_URL}/article/delete/${id}`, {
      method: "DELETE",
      credentials: "include",
    });

    if (response.status == 200) {
      router.refresh();
    }
  };

  return (
    <div className="flex justify-between gap-4 min-h-[30vh]">
      <div className="w-1/3 relative hidden md:block">
        <Image
          src={`${BACKEND_URL}/${image}`}
          fill
          alt="article image"
          className="object-cover"
        />
      </div>
      <div className="flex-1 flex flex-col sm:flex-row justify-between gap-8">
        <div>
          <h1 className="text-3xl font-bold mb-1">{title}</h1>
          <span className="block font-light mb-1">{formatDate(dateAdded)}</span>
          <p className="text-justify">{description}</p>
        </div>

        <div className="flex items-center justify-top flex-col gap-2">
          <button
            className="block border-2 w-full border-solid border-white py-2 px-8 hover:bg-white hover:text-black"
            onClick={() => router.replace(`/edit?id=${id}`)}
          >
            Edit
          </button>
          <button
            className="block w-full bg-red-700 hover:bg-red-500 py-2 px-8"
            onClick={deleteArticle}
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};

export default ArticleListCard;
