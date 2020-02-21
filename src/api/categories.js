import axios from 'axios';
import apiRoutes from '../constants/apiRoutes';

import getLanguage from '../utils/localization';

const { language } = getLanguage();

const getCategories = () =>
  axios.get(`${apiRoutes.categories}`, { params: { lang: language } });

const getCategory = id =>
  axios.get(`${apiRoutes.categories}/${id}`, { params: { lang: language } });

const updateCategory = (id, category) =>
  axios.post(apiRoutes.categories, { ...category }, { params: { id } });

export default { getCategories, getCategory, updateCategory };
