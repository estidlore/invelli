const cleanKeywords = (keywords: string[]): string[] => {
  return keywords.filter((kw) => kw.length > 0).map((kw) => kw.toLowerCase());
};

const searchItems = <T>(
  input: string,
  items: T[],
  getKeywords: (item: T) => string[]
): T[] => {
  const keywords = cleanKeywords(input.split(" "));

  return items
    .map((item) => {
      const itemKeywords = cleanKeywords(getKeywords(item));
      const matches = itemKeywords.flatMap((itemKeyword) => {
        return keywords.map((keyword) => {
          if (itemKeyword.includes(keyword)) {
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
