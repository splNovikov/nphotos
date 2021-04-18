import axios from 'axios';

import apiRoutes from '../constants/apiRoutes';

import getLanguage from '../utils/localization';

const { language } = getLanguage();

const generateFormData = album => {
  const formData = new FormData();

  formData.append('cover', album.cover);
  formData.append('titleRus', album.titleRus);
  formData.append('titleEng', album.titleEng);
  if (album.categoryId) {
    formData.append('categoryId', album.categoryId);
  }

  return formData;
};

const getAlbums = () =>
  axios.get(`${apiRoutes.albums}`, { params: { lang: language } });

const getAlbum = id =>
  axios.get(`${apiRoutes.albums}/${id}`, { params: { lang: language } });

const updateAlbum = album => {
  if (typeof album.cover === 'string') {
    return axios.put(`${apiRoutes.albums}/${album.id}`, album);
  }

  const formData = generateFormData(album);

  return axios.put(`${apiRoutes.albums}/${album.id}`, formData);
};

const createAlbum = album => {
  const formData = generateFormData(album);

  return axios.post(apiRoutes.albums, formData);
};

const deleteAlbum = (albumId, categoryId) =>
  axios.delete(apiRoutes.albums, {
    params: {
      albumId,
      categoryId
    }
  });

export default { getAlbums, getAlbum, updateAlbum, createAlbum, deleteAlbum };
