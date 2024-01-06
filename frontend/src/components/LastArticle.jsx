import Image from "next/image";
import heroImg from "@../public/hero.jpg";
import { unstable_noStore as noStore } from "next/cache";
import formatDate from "@utils/formatDate";

const getLatestArticle = async () => {
  noStore();
  const response = await fetch(`${process.env.BACKEND_URL}/article/last`);
  const article = await response.json();

  article.dateAdded = formatDate(article.dateAdded);

  return article;
};

const LastArticle = async () => {
  const { title, description, dateAdded, image } = await getLatestArticle();

  return (
    <div className="mb-20">
      <div className="w-full h-[35vh] md:h-[60vh] lg:h-[80vh] relative mb-14">
        <Image
          src={`${process.env.BACKEND_URL}/${image}`}
          fill
          alt="article image"
          className="object-cover"
        />
      </div>
      <div className="flex flex-col sm:flex-row gap-x-12">
        <div className="flex-1">
          <h1 className="text-5xl mb-6 hover:underline leading-[1.10]">
            {title}
          </h1>
          <span className="block mb-6 sm:mb-0">{dateAdded}</span>
        </div>
        <div className="flex-1">
          <p className="leading-relaxed text-lg">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default LastArticle;
