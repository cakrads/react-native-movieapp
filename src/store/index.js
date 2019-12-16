import {applyMiddleware, createStore, compose} from 'redux';
import thunk from 'redux-thunk';
import allReducers from './reducers';

import {persistStore, persistReducer} from 'redux-persist';
// import AsyncStorage from '@react-native-community/async-storage'
import AsyncStorage from '@react-native-community/async-storage';

const persistConfig = {
  key: 'mashara',
  blacklist: ['movieReducer'],
  storage: AsyncStorage,
};

let persistedReducer = persistReducer(persistConfig, allReducers);

export default () => {
  let store = createStore(persistedReducer, compose(applyMiddleware(thunk)));
  let persistor = persistStore(store);
  return {
    store,
    persistor,
  };
};
