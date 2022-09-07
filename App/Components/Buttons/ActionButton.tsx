import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {commonData} from '../../Data/static/commonData';
import AppText from '../Typography/AppText';
import DynamicIcon from '../Common/DynamicIcon';
import HStack from '../Layouts/HStack';

const ActionButton = ({text, action, onPress}) => {
  const {FINANCE_SECTION_COLOR, DANGER_COLOR, CHECKER_SECTION_COLOR} =
    commonData.colors;
  return (
    <TouchableOpacity
      style={{
        ...styles.button,
        backgroundColor:
          action === 'delete' ? CHECKER_SECTION_COLOR : FINANCE_SECTION_COLOR,
      }}
      onPress={onPress}>
      <HStack>
        {action === 'delete' ? (
          <DynamicIcon
            family="MaterialCommunityIcons"
            name="delete"
            size={20}
          />
        ) : (
          <DynamicIcon
            family="MaterialCommunityIcons"
            name="cancel"
            size={20}
          />
        )}
        <AppText text={text} type="Montserrat-Bold,#fff," ml={5} />
      </HStack>
    </TouchableOpacity>
  );
};

export default ActionButton;

const styles = StyleSheet.create({
  button: {
    backgroundColor: commonData.colors.CHECKER_SECTION_COLOR,
    width: '100%',
    borderRadius: 6,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
});