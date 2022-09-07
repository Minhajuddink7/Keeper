import React from 'react';
import {View, Text} from 'react-native';
import DynamicIcon from './DynamicIcon';
const NoItem = ({text, color}) => {
  return (
    <View style={{alignItems: 'center', marginTop: '45%'}}>
      <DynamicIcon family="FontAwesome5" name="inbox" size={50} color={color} />
      <Text
        style={{
          marginTop: 15,
          textAlign: 'center',
          fontFamily: 'Montserrat-Medium',
          fontSize: 16,
        }}>
        {text}
      </Text>
    </View>
  );
};

export default NoItem;
