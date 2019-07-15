import axios from 'axios';
import apiRoutes from '../constants/apiRoutes';

const getAlbum = id => axios.get(`${apiRoutes.albums}/${id}`);

export default { getAlbum };
