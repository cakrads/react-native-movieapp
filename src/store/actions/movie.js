import * as TYPE from './type';
import * as API from '../../api';

export const getMoviePopular = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: TYPE.SET_MOVIE_POPULAR_LIST_RESET,
      });

      const response = await API.getMoviePopular({page: 1});

      dispatch({
        type: TYPE.SET_MOVIE_POPULAR_LIST,
        data: response.results,
      });

      return {
        status: true,
        message: 'success',
      };
    } catch (error) {
      throw {
        status: false,
        message: error,
      };
    }
  };
};

export const getMovieInTheater = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: TYPE.SET_MOVIE_THEATER_LIST_RESET,
      });

      const response = await API.getMovieInTheater({page: 1});

      dispatch({
        type: TYPE.SET_MOVIE_THEATER_LIST,
        data: response.results,
      });
      // console.log('getState().movieReducer: ', getState().movieReducer);

      return {
        status: true,
        message: 'success',
      };
    } catch (error) {
      throw {
        status: false,
        message: error,
      };
    }
  };
};

export const getGlobalList = (firstInit = false, data) => {
  return async (dispatch, getState) => {
    try {
      let page = firstInit ? 1 : getState().movieReducer.globalList.page;
      let params = {...data, page: page};
      console.log("params", params)
      if (firstInit) {
        dispatch({
          type: TYPE.SET_MOVIE_LIST_RESET,
        });
      }

      const response = await API.getGlobalList(params);

      dispatch({
        type: TYPE.SET_MOVIE_LIST,
        data: response.results,
        page: page + 1,
      });
      // console.log('getState().movieReducer: ', getState().movieReducer);

      return {
        status: true,
        message: 'success',
      };
    } catch (error) {
      throw {
        status: false,
        message: error,
      };
    }
  };
};

export const getMovieDetail = movieID => {
  return async (dispatch, getState) => {
    try {
      const response = await API.getMovieDetail(movieID);
      console.log(response);
      dispatch({
        type: TYPE.SET_MOVIE_DETAIL,
        data: response,
      });
      // console.log('getState().movieReducer: ', getState().movieReducer);

      return {
        status: true,
        message: 'success',
      };
    } catch (error) {
      throw {
        status: false,
        message: error,
      };
    }
  };
};

export const getGenreAll = () => {
  return async (dispatch, getState) => {
    try {
      const response = await API.getGenreAll();

      dispatch({
        type: TYPE.SET_MOVIE_GENRE,
        data: response.genres,
      });
      // console.log('getState().movieReducer: ', getState().movieReducer.genre);

      return {
        status: true,
        message: 'success',
      };
    } catch (error) {
      throw {
        status: false,
        message: error,
      };
    }
  };
};

export const genreByID = genreID => {
  return (dispatch, getState) => {
    try {
      const genreAll = getState().movieReducer.genre;
      if (genreAll.length == 0) return {id: genreByID, name: '-'};
      return getGenreAll.filter(x => x.id == genreByID);
    } catch (error) {
      throw {
        status: false,
        message: error,
      };
    }
  };
};

const dummy = {
  adult: false,
  backdrop_path: '/bOGkgRGdhrBYJSLpXaxhXVstddV.jpg',
  genre_ids: [28, 12, 878],
  id: 299536,
  original_language: 'en',
  original_title: 'Avengers: Infinity War',
  overview:
    'As the Avengers and their allies have continued to protect the world from threats too large for any one hero to handle, a new danger has emerged from the cosmic shadows: Thanos. A despot of intergalactic infamy, his goal is to collect all six Infinity Stones, artifacts of unimaginable power, and use them to inflict his twisted will on all of reality. Everything the Avengers have fought for has led up to this moment - the fate of Earth and existence itself has never been more uncertain.',
  popularity: 82.669,
  poster_path: '/7WsyChQLEftFiDOVTGkv3hFpyyt.jpg',
  release_date: '2018-04-25',
  title: 'Avengers: Infinity War',
  video: false,
  vote_average: 8.3,
  vote_count: 16029,
};
