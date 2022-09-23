/**
 * @format
 */

import React from 'react';
import 'react-native-gesture-handler';
// import {Provider} from 'react-redux';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
// import store from './App/Data/redux/store';

// const ReduxApp = () => {
//   return (
//     <Provider store={store}>
//       <App />
//     </Provider>
//   );
// };

AppRegistry.registerComponent(appName, () => App);
