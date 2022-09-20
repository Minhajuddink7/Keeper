// import {applyMiddleware, createStore} from 'redux';
// import {createLogger} from 'redux-logger';
// import thunk from 'redux-thunk';
// import promise from 'redux-promise-middleware';
// import reducer from '../reducers/uiReducer';
// const middleware = __DEV__
//   ? applyMiddleware(promise, thunk, createLogger())
//   : applyMiddleware(promise, thunk);
// export default createStore(reducer, middleware);
import appReducer from '../reducers';
import {createStore} from 'redux';
import {persistStore, persistReducer} from 'redux-persist';

import AsyncStorage from '@react-native-async-storage/async-storage';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, appReducer);

export default () => {
  let store = createStore(persistedReducer);
  let persistor = persistStore(store);
  return {store, persistor};
};
