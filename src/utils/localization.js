import locales from '../locales';

const getLanguageMessages = () => {
  const { memoLang, memoMess } = getLanguageMessages;

  if (memoLang && memoMess) {
    return {
      language: memoLang,
      messages: memoMess
    };
  }

  // Define user's language. Different browsers have the user locale defined
  // on different fields on the `navigator` object, so we make sure to account
  // for these different by checking all of them
  //   returns something like: en-US
  // const language =
  //   (navigator.languages && navigator.languages[0]) || navigator.language;
  // todo: return back localization somehow. Because it is not working correctly now
  const language = 'ru-Ru';

  // Split locales with a region code
  const languageWithoutRegionCode = language.toLowerCase().split(/[_-]+/)[0];

  // Try full locale, try locale without region code, fallback to 'ru'
  const messages =
    locales[languageWithoutRegionCode] || locales[language] || locales.ru;

  getLanguageMessages.memoLang = languageWithoutRegionCode;
  getLanguageMessages.memoMess = messages;

  return { language: languageWithoutRegionCode, messages };
};

export default getLanguageMessages;
