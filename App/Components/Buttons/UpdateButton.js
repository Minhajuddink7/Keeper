import {TouchableOpacity} from 'react-native';
import React from 'react';
import {commonData} from '../../Data/static/commonData';
import DynamicIcon from '../Common/DynamicIcon';

const UpdateButton = ({navigation, onUpdate}) => {
  return (
    <TouchableOpacity
      style={{
        height: 50,
        width: 50,
        borderRadius: 50,
        position: 'absolute',
        right: 30,
        bottom: 30,
        backgroundColor: commonData.colors.FINANCE_SECTION_COLOR,
        alignItems: 'center',
        justifyContent: 'center',
      }}
      onPress={onUpdate}>
      <DynamicIcon family="FontAwesome" name="check" size={18} />
    </TouchableOpacity>
  );
};

export default UpdateButton;
