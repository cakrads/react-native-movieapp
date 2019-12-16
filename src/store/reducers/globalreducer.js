import * as TYPES from '../actions/type';
import { globalState } from './state';

const globalReducer = (state = globalState, action) => {
  switch (action.type) {
    case TYPES.SET_DEFAULT:
      return globalState;
  }
  return state;
};

export default globalReducer;
