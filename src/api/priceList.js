import axios from 'axios';
import apiRoutes from '../constants/apiRoutes';

import getLanguage from '../utils/localization';

const { language } = getLanguage();

const getPriceList = () =>
  axios.get(`${apiRoutes.priceList}`, { params: { lang: language } });

export default { getPriceList };
