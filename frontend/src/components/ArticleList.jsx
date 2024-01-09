import ArticleListCard from "./ArticleListCard";

const ArticleList = ({ articles }) => {
  return (
    <div className={`grid grid-cols-1 grid-rows-${articles.length} gap-4 mb-8`}>
      {articles.map((article) => (
        <ArticleListCard
          image={article.image}
          title={article.title}
          description={article.description}
          dateAdded={article.dateAdded}
          id={article._id}
        />
      ))}
    </div>
  );
};

export default ArticleList;
