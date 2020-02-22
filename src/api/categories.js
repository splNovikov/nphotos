import axios from 'axios';
import apiRoutes from '../constants/apiRoutes';

import getLanguage from '../utils/localization';

const { language } = getLanguage();

const getCategories = () =>
  axios.get(`${apiRoutes.categories}`, { params: { lang: language } });

const getCategory = id =>
  axios.get(`${apiRoutes.categories}/${id}`, { params: { lang: language } });

const updateCategory = (id, category) => {
  if (typeof category.cover === 'string') {
    return axios.put(`${apiRoutes.categories}/${id}`, category);
  }

  const formData = new FormData();
  formData.append('cover', category.cover);
  formData.append('titleRus', category.titleRus);
  formData.append('titleEng', category.titleEng);

  return axios.put(`${apiRoutes.categories}/${id}`, formData);
};

export default { getCategories, getCategory, updateCategory };
