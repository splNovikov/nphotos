import axios from 'axios';
import apiRoutes from '../constants/apiRoutes';

const uploadImages = images => {
  const formData = new FormData();

  Array.from(images).forEach(file => formData.append('image', file));

  axios.post(apiRoutes.files, formData);
};

export default { uploadImages };
