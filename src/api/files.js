import axios from 'axios';
import apiRoutes from '../constants/apiRoutes';

const uploadImages = (images, albumId) => {
  const formData = new FormData();

  Array.from(images).forEach(file => formData.append('image', file));

  return axios.post(apiRoutes.files, formData, {
    params: {
      albumId
    }
  });
};

export default { uploadImages };
