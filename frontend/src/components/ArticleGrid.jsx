import ArticleCard from "./ArticleCard";

const ArticleGrid = ({ articles }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
      {articles.map((article, index) => (
        <ArticleCard
          title={article.title}
          description={article.description}
          image={article.image}
          dateAdded={article.dateAdded}
          key={index}
        />
      ))}
    </div>
  );
};
export default ArticleGrid;
