import axios from 'axios';
import apiRoutes from '../constants/apiRoutes';

const getUser = () => axios.get(`${apiRoutes.user}`);

export default { getUser };
