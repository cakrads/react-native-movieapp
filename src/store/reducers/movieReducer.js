import * as TYPES from '../actions/type';
import {movieState} from './state';

const movieReducer = (state = movieState, action) => {
  switch (action.type) {
    case TYPES.SET_DEFAULT:
      return movieState;
    case TYPES.SET_MOVIE_POPULAR_LIST:
      return {
        ...state,
        popular: {
          list: action.data,
          page: action.page,
        },
      };
    case TYPES.SET_MOVIE_POPULAR_LIST_RESET:
      return {
        ...state,
        popular: {
          list: null,
          page: 1,
        },
      };
    case TYPES.SET_MOVIE_THEATER_LIST:
      return {
        ...state,
        inTheatre: {
          list: action.data,
          page: action.page,
        },
      };
    case TYPES.SET_MOVIE_THEATER_LIST_RESET:
      return {
        ...state,
        inTheatre: {
          list: null,
          page: 1,
        },
      };
    case TYPES.SET_MOVIE_DETAIL:
      return {
        ...state,
        detail: action.data,
      };
    case TYPES.SET_MOVIE_GENRE:
      return {
        ...state,
        genre: action.data,
      };
  }
  return state;
};

export default movieReducer;
