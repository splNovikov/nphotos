const randomNumber = (n, min, max, res = []) => {
  if (n > max - min) {
    return [];
  }
  if (res.length === n) {
    return res;
  }

  const num = Math.floor(Math.random() * max) + min;

  if (res.filter(r => r === num).length) {
    return randomNumber(n, min, max, res);
  }

  return randomNumber(n, min, max, [...res, num]);
};

export default randomNumber;
