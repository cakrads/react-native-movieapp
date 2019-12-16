import React from 'react';
import MainNavigator from "./src/screens";

import {
  StatusBar,
} from 'react-native';

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import AppStore from "./src/store";
const { store, persistor } = AppStore();

const App: () => React$Node = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <StatusBar barStyle="dark-content" />
        <MainNavigator />
      </PersistGate>
    </Provider>
  );
};

export default App;
