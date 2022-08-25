import {SafeAreaView} from 'react-native';
import React from 'react';

const FullPage = ({children, color = '#fff'}) => {
  return (
    <SafeAreaView style={{backgroundColor: color, flex: 1}}>
      {children}
    </SafeAreaView>
  );
};

export default FullPage;
