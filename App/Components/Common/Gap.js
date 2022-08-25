import {View} from 'react-native';
import React from 'react';

const Gap = props => {
  const gap = props?.gap || 15;
  return <View style={{marginTop: gap}}></View>;
};

export default Gap;
