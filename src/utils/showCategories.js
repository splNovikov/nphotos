const showCategories =
  process.env.SHOW_CATEGORIES === 'true' ||
  process.env.NODE_ENV === 'development';

export default showCategories;
