import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {commonData} from '../../Data/static/commonData';

const TextLink = ({text, onPress}) => {
  let textStyle = {
    fontFamily: 'Kalam-Bold',
    fontSize: 18,
    color: commonData.colors.NOTES_SECTION_COLOR,
    textDecorationLine: 'underline',
  };

  return (
    <TouchableOpacity onPress={onPress}>
      <Text style={textStyle}>{text}</Text>
    </TouchableOpacity>
  );
};

export default TextLink;
