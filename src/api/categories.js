import axios from 'axios';

import apiRoutes from '../constants/apiRoutes';

import getLanguage from '../utils/localization';

const { language } = getLanguage();

const generateFormData = category => {
  const formData = new FormData();

  formData.append('cover', category.cover);
  formData.append('titleRus', category.titleRus);
  formData.append('titleEng', category.titleEng);

  return formData;
};

const getCategories = () =>
  axios.get(`${apiRoutes.categories}`, { params: { lang: language } });

const getCategory = id =>
  axios.get(`${apiRoutes.categories}/${id}`, { params: { lang: language } });

const updateCategory = category => {
  if (typeof category.cover === 'string') {
    return axios.put(`${apiRoutes.categories}/${category.id}`, category);
  }

  const formData = generateFormData(category);

  return axios.put(`${apiRoutes.categories}/${category.id}`, formData);
};

const createCategory = category => {
  const formData = generateFormData(category);

  return axios.post(apiRoutes.categories, formData);
};

export default { getCategories, getCategory, updateCategory, createCategory };
