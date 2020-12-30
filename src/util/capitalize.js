const capitalizeFirstLetter = (str, partition = '-') => {
  console.log(str);
  str = str.split(partition);
  for (var i = 0, x = str.length; i < x; i++) {
    str[i] = str[i][0].trim().toUpperCase() + str[i].substr(1);
  }
  return str.join(' ');
};

export default capitalizeFirstLetter;
