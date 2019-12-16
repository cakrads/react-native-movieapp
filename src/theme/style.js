const basicColor = {
  // color
  primary: 'blue',
  secondary: 'cyan',
  success: 'green',
  warning: 'yellow',
  danger: 'red',
  dark: 'gray',
  light: 'white',
  white: 'white',
  black: 'black',
};

const title = {
  // title
  titleCard: {
    fontSize: 16,
    fontWeight: 'bold',
    textTransform: 'capitalize',
    color: basicColor.black,
    maxWidth: '95%',
  },
  titleCardV2: {
    fontSize: 16,
    fontWeight: 'bold',
    textTransform: 'capitalize',
    color: basicColor.black,
    maxWidth: '95%',
  },
};

const additional = {
  borderRadius: 8,
};
export default {
  ...basicColor,
  ...title,
  ...additional,
};
