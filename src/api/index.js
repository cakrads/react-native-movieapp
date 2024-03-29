import api from '../helpers/api';
import APIPATH, {BASE_URL, API_KEY} from './path';

export const getMoviePopular = async () => {
  try {
    let params = {
      ...APIPATH.movie.popular,
      ...API_KEY,
    };
    const API = new api();
    return await API.get(`${BASE_URL}${APIPATH.movie.main}`, params);
  } catch (error) {
    throw error;
  }
};

export const getMovieInTheater = async () => {
  try {
    let params = {
      ...API_KEY,
      ...APIPATH.movie.inTheatre,
    };
    const API = new api();
    return await API.get(`${BASE_URL}${APIPATH.movie.main}`, params);
  } catch (error) {
    throw error;
  }
};

export const getGlobalList = async params => {
  try {
    let addParams =
      params.type === 'inTheater'
        ? APIPATH.movie.inTheatre
        : params.type === 'popular'
        ? APIPATH.movie.popular
        : params.type === 'genre'
        ? {...params}
        : {};

    params = {
      ...addParams,
      ...API_KEY,
    };
    const API = new api();
    return await API.get(`${BASE_URL}${APIPATH.movie.main}`, params);
  } catch (error) {
    throw error;
  }
};

export const getMovieDetail = async (movieID, params) => {
  try {
    params = {
      ...params,
      ...API_KEY,
    };
    const API = new api();
    return await API.get(
      `${BASE_URL}${APIPATH.movie.detail}/${movieID}`,
      params,
    );
  } catch (error) {
    throw error;
  }
};

export const getGenreAll = async (movieID, params) => {
  try {
    params = {
      ...params,
      ...API_KEY,
    };
    const API = new api();
    return await API.get(`${BASE_URL}${APIPATH.movie.genre}`, params);
  } catch (error) {
    throw error;
  }
};
