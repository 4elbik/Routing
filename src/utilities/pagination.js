export const skipArticlesCounter = (pageNumber, articlesPerPage) => {
  return (pageNumber - 1) * articlesPerPage;
};

export default skipArticlesCounter;
