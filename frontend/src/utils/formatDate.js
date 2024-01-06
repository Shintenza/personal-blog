const formatDate = (dateStr) => {
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const formattedDate = new Date(dateStr).toLocaleDateString("en-US", options);
  return formattedDate;
}

export default formatDate;
