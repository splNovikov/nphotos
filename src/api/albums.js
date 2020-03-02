import axios from 'axios';
import apiRoutes from '../constants/apiRoutes';

import getLanguage from '../utils/localization';

const { language } = getLanguage();

const getAlbums = () =>
  axios.get(`${apiRoutes.albums}`, { params: { lang: language } });

const getAlbum = id =>
  axios.get(`${apiRoutes.albums}/${id}`, { params: { lang: language } });

const createAlbum = ({ cover, categoryId, titleRus, titleEng }) => {
  const formData = new FormData();

  formData.append('cover', cover);
  // todo: JSON.stringify??? Look how ot works on categories
  formData.append(
    'album',
    JSON.stringify({
      categoryId,
      titleRus,
      titleEng
    })
  );

  return axios.post(apiRoutes.albums, formData);
};

export default { getAlbums, getAlbum, createAlbum };
