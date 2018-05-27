import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import * as Firebase from "firebase";
import { firebase } from "./firebase.config";
import { Router } from "react-router-dom";
import createBrowserHistory from "history/createBrowserHistory";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import Thunk from "redux-thunk";
import rootReducer from "./rootReducer";
import { PersistGate } from "redux-persist/integration/react";

import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web and AsyncStorage for react-native

const persistConfig = {
  key: "root",
  storage
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(persistedReducer, {}, applyMiddleware(Thunk));
const persistor = persistStore(store);

const history = createBrowserHistory();
// eslint-disable-next-line
firebase;
let app;

const APP = (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Router history={history}>
        <App />
      </Router>
    </PersistGate>
  </Provider>
);

Firebase.auth().onAuthStateChanged(user => {
  if (!app) {
    app = ReactDOM.render(APP, document.getElementById("root"));
    registerServiceWorker();
  }
});
