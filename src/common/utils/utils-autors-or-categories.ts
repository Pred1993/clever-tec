export const authorsOrCategoriesBook = (params: string[] | null) =>
  params?.length ? params.reduce((acc, el) => `${acc}, ${el}`) : null;
