import {Button, Text} from 'react-native';
import React, {useEffect} from 'react';
import FullPage from './App/Components/Layouts/FullPage';
import AppText from './App/Components/Typography/AppText';
import DynamicIcon from './App/Components/Common/DynamicIcon';
import Gap from './App/Components/Common/Gap';
import HStack from './App/Components/Layouts/HStack';
import Container from './App/Components/Layouts/Container';
import {commonData} from './App/Data/static/commonData';
import {showToast} from './App/Helpers/utils';
import HomeScreen from './App/Screens/HomeScreen';
import RootNavigator from './App/Screens/Navigations/RootNavigator';
// import {REACT_APP_DEV_MODE, REACT_APP_PROD_MODE} from 'react-native-dotenv';

const App = () => {
  return (
    <FullPage color={commonData.colors.DARK_THEME_COLOR}>
      <RootNavigator />
    </FullPage>
  );
};

export default App;
