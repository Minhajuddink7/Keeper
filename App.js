import React from 'react';
import FullPage from './App/Components/Layouts/FullPage';

import {commonData} from './App/Data/static/commonData';

import RootNavigator from './App/Screens/Navigations/RootNavigator';
import {Provider, useSelector} from 'react-redux';

import {PersistGate} from 'redux-persist/integration/react';
import storeConfig from './App/Data/redux/store';

const Root = () => {
  const theme = useSelector(state => state.ui.theme);
  console.log('theme: ', theme);
  return (
    <FullPage color={commonData.colors.DARK_THEME_COLOR}>
      <RootNavigator />
    </FullPage>
  );
};
const App = () => {
  const {store, persistor} = storeConfig();
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Root />
      </PersistGate>
    </Provider>
  );
};

export default App;
