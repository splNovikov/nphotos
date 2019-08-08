const formatPhoneNumber = phoneNumberString => {
  const cleaned = `${phoneNumberString}`.replace(/\D/g, '');
  const match = cleaned.match(/^(8|)?(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    const intlCode = match[1] ? '+7 ' : '';

    return `${intlCode} (${match[2]}) ${match[3]} ${match[4]}`;
  }
  return null;
};

export default formatPhoneNumber;
