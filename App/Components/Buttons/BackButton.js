import {TouchableOpacity} from 'react-native';
import React from 'react';
import {commonData} from '../../Data/static/commonData';
import DynamicIcon from '../Common/DynamicIcon';

const BackButton = ({navigation, color}) => {
  return (
    <TouchableOpacity
      style={{
        height: 50,
        width: 50,
        borderRadius: 50,
        position: 'absolute',
        left: 30,
        bottom: 30,
        backgroundColor: commonData.colors.NOTES_SECTION_COLOR,
        alignItems: 'center',
        justifyContent: 'center',
      }}
      onPress={() => navigation.goBack()}>
      <DynamicIcon family="FontAwesome" name="chevron-left" size={18} />
    </TouchableOpacity>
  );
};

export default BackButton;
