export const showPicture = (img: string | null, basicImage: string) => {
  const host = 'https://strapi.cleverland.by';
  let cover;

  if (img) {
    cover = `${host}${img}`;
  } else cover = basicImage;

  return cover;
};
