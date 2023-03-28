import React from 'react';
import {TouchableOpacity, Text} from 'react-native';
import {commonData} from '../../Data/static/commonData';
import AppText from '../Typography/AppText';

const FullButton = ({
  text,
  method,
  color,
  margin = '6%',
  height = 40,
  disabled = false,
}) => {
  return (
    <TouchableOpacity
      style={{
        backgroundColor: disabled ? '#bbb' : color,
        height: height,
        marginHorizontal: margin,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        // ...commonData().shadowStyle,
      }}
      disabled={disabled}
      onPress={() => method()}>
      <AppText text={text} type={`Kalam-Bold,#fff,`} />
      {/* <Text style={{color: '#fff', fontFamily: 'Inter-Bold'}}>{text}</Text> */}
    </TouchableOpacity>
  );
};

export default FullButton;
