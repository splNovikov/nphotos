import axios from 'axios';
import apiRoutes from '../constants/apiRoutes';

import getLanguage from '../utils/localization';

const { language } = getLanguage();

const getAbout = () =>
  axios.get(`${apiRoutes.about}`, { params: { lang: language } });

export default { getAbout };
