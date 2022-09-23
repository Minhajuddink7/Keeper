import React, {useEffect} from 'react';
import FullPage from './App/Components/Layouts/FullPage';
import {authentication, db} from './firebase/firebase-config';
import {commonData} from './App/Data/static/commonData';
import 'react-native-gesture-handler';
import RootNavigator from './App/Screens/Navigations/RootNavigator';
import {Provider} from 'react-redux';

import {PersistGate} from 'redux-persist/integration/react';
import storeConfig from './App/Data/redux/store';
import {SafeAreaView, StatusBar, StyleSheet, View} from 'react-native';

import {collection, getDocs} from 'firebase/firestore/lite';
const Root = () => {
  useEffect(() => {
    // setTimeout(() => {
    // }, 1000);
  }, []);
  return (
    <FullPage color={commonData.colors.DARK_THEME_COLOR}>
      <MyStatusBar
        backgroundColor={commonData.colors.DARK_THEME_COLOR}
        barStyle="light-content"
      />
      <RootNavigator />
    </FullPage>
  );
};

const MyStatusBar = ({backgroundColor, ...props}) => (
  <View style={[styles.statusBar, {backgroundColor}]}>
    <SafeAreaView>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </SafeAreaView>
  </View>
);

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
const styles = StyleSheet.create({
  statusBar: {
    height: StatusBar.currentHeight,
  },
});
