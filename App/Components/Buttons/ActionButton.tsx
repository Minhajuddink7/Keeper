import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {commonData} from '../../Data/static/commonData';
import AppText from '../Typography/AppText';
import DynamicIcon from '../Common/DynamicIcon';
import HStack from '../Layouts/HStack';

const ActionButton = ({text, action, onPress}) => {
  const {
    FINANCE_SECTION_COLOR,
    LIGHT_TEXT_COLOR,
    CHECKER_SECTION_COLOR,
    DANGER_COLOR,
  } = commonData.colors;
  return (
    <TouchableOpacity
      style={{
        ...styles.button,
        backgroundColor:
          action === 'delete'
            ? DANGER_COLOR
            : action === 'save'
            ? CHECKER_SECTION_COLOR
            : 'gray',
      }}
      onPress={onPress}>
      <HStack>
        {action === 'delete' ? (
          <DynamicIcon
            family="MaterialCommunityIcons"
            name="delete"
            size={20}
            color={LIGHT_TEXT_COLOR}
          />
        ) : action === 'save' ? (
          <DynamicIcon
            family="FontAwesome5"
            name="check"
            size={16}
            color={LIGHT_TEXT_COLOR}
          />
        ) : (
          <DynamicIcon
            family="MaterialCommunityIcons"
            name="cancel"
            size={20}
            color={LIGHT_TEXT_COLOR}
          />
        )}
        <AppText text={text} type="Kalam-Bold,#fff,18" ml={5} />
      </HStack>
    </TouchableOpacity>
  );
};

export default ActionButton;

const styles = StyleSheet.create({
  button: {
    backgroundColor: commonData.colors.CHECKER_SECTION_COLOR,
    width: '100%',
    borderRadius: 8,
    height: 42,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
