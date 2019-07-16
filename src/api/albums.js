import axios from 'axios';
import apiRoutes from '../constants/apiRoutes';

const getAlbums = () => axios.get(`${apiRoutes.albums}`);
const getAlbum = id => axios.get(`${apiRoutes.albums}/${id}`);

export default { getAlbums, getAlbum };
