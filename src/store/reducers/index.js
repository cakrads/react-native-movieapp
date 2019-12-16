import {combineReducers} from 'redux';

import globalReducer from './globalreducer';
import movieReducer from './movieReducer';

export default combineReducers({
  globalReducer,
  movieReducer,
});
