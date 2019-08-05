import axios from 'axios';
import apiRoutes from '../constants/apiRoutes';

import getLanguage from '../utils/localization';

const { language } = getLanguage();

const getContacts = () =>
  axios.get(`${apiRoutes.contacts}`, { params: { lang: language } });

export default { getContacts };
