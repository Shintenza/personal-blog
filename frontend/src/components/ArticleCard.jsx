import formatDate from "@utils/formatDate";
import Image from "next/image";

const ArticleCard = ({ title, description, image, dateAdded }) => {
  return (
    <article>
      <div className="relative w-full min-h-[45vh] mb-4">
        <Image
          src={`${process.env.BACKEND_URL}/${image}`}
          fill
          alt="article image"
          className="object-cover"
        />
      </div>
      <h1 className="text-4xl mb-3 hover:underline">{title}</h1>
      <span className="block mb-3">{formatDate(dateAdded)}</span>
      <p>{description}</p>
    </article>
  );
};

export default ArticleCard;
