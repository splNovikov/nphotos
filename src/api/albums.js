import axios from 'axios';
import apiRoutes from '../constants/apiRoutes';

import getLanguage from '../utils/localization';

const { language } = getLanguage();

const getAlbums = () =>
  axios.get(`${apiRoutes.albums}`, { params: { lang: language } });

const getAlbum = id =>
  axios.get(`${apiRoutes.albums}/${id}`, { params: { lang: language } });

export default { getAlbums, getAlbum };
