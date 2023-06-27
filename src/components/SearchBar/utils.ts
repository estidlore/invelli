const searchItems = <T>(
  input: string,
  items: T[],
  getKeywords: (item: T) => string[]
): T[] => {
  const keywords = input.trim().toLowerCase().split(" ");

  return items
    .map((item) => {
      const itemKeywords = getKeywords(item);
      const matches = keywords.flatMap((keyword) => {
        return itemKeywords.map((itemKeyword) => {
          if (itemKeyword.toLowerCase().includes(keyword)) {
            return keyword.length / itemKeyword.length;
          }
          return 0;
        });
      });
      const match = matches.reduce((acc, el) => acc + el, 0);

      return { item, match };
    })
    .filter((el) => el.match > 0)
    .sort((a, b) => b.match - a.match)
    .map((el) => el.item);
};

export { searchItems };
