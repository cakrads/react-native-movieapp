const basicColor = {
  // color
  primary: 'blue',
  secondary: 'cyan',
  success: 'green',
  warning: 'yellow',
  danger: 'red',
  gray: 'gray',
  dark: 'black',
  light: 'white',
  white: 'white',
  black: 'black',
};

const title = {
  // title
  titleList: {
    fontSize: 20,
    fontWeight: 'bold',
    textTransform: 'capitalize',
    color: basicColor.black,
    marginBottom: 15,
  },
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
  container: {
    padding: 10,
  },
};
export default {
  ...basicColor,
  ...title,
  ...additional,
};
