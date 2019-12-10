import axios from 'axios';
import apiRoutes from '../constants/apiRoutes';

const uploadImages = (images, albumId) => {
  const formData = new FormData();

  Array.from(images).forEach(image => formData.append('image', image));

  return axios.post(apiRoutes.images, formData, {
    params: {
      albumId
    }
  });
};

export default { uploadImages };
