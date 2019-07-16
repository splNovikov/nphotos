import axios from 'axios';
import apiRoutes from '../constants/apiRoutes';

const getAlbums = () => axios.get(`${apiRoutes.albums}`);
// todo: lang by intl
const getAlbum = id =>
  axios.get(`${apiRoutes.albums}/${id}`, { params: { lang: 'rus' } });

export default { getAlbums, getAlbum };
