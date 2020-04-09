const randomNumber = (n, min, max, res = []) => {
  if (res.length === n) {
    return res;
  }

  const num = Math.floor(Math.random() * max) + min;

  if (res.find(r => r === num)) {
    return randomNumber(n, min, max, res);
  }

  return randomNumber(n, min, max, [...res, num]);
};

export default randomNumber;
