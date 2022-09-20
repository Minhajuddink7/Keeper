import {TouchableOpacity} from 'react-native';
import React from 'react';
import {commonData} from '../../Data/static/commonData';
import DynamicIcon from '../Common/DynamicIcon';

const HomeButton = ({onPress}) => {
  return (
    <TouchableOpacity
      style={{
        height: 50,
        width: 50,
        borderRadius: 50,
        position: 'absolute',
        left: 30,
        bottom: 30,
        backgroundColor: commonData.colors.HEALTH_SECTION_COLOR,
        alignItems: 'center',
        justifyContent: 'center',
      }}
      onPress={onPress}>
      <DynamicIcon family="FontAwesome5" name="home" size={18} />
    </TouchableOpacity>
  );
};

export default HomeButton;
