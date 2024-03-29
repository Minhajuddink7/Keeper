import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import HStack from '../Layouts/HStack';
import AppText from '../Typography/AppText';
import DynamicIcon from '../Common/DynamicIcon';
import {commonData} from '../../Data/static/commonData';

const BottomActions = ({actions}) => {
  const iconSizeAndColor = {size: 20, color: '#ccc'};
  function getActionButton(action) {
    switch (action) {
      case 'home':
        return (
          <DynamicIcon
            family="FontAwesome5"
            name="home"
            {...iconSizeAndColor}
          />
        );
      case 'back':
        return (
          <DynamicIcon
            family="FontAwesome5"
            name="chevron-left"
            {...iconSizeAndColor}
          />
        );
      case 'lists':
        return (
          <DynamicIcon family="Feather" name="list" {...iconSizeAndColor} />
        );
      case 'add':
        return (
          <DynamicIcon family="Entypo" name="plus" {...iconSizeAndColor} />
        );
      case 'write':
        return (
          <DynamicIcon
            family="FontAwesome5"
            name="pen-alt"
            {...iconSizeAndColor}
          />
        );
      case 'update':
        return (
          <DynamicIcon
            family="FontAwesome5"
            name="check"
            {...iconSizeAndColor}
          />
        );
      case 'play':
        return (
          <DynamicIcon
            name="book-open"
            family="FontAwesome5"
            {...iconSizeAndColor}
          />
        );
      case 'filter':
        return (
          <DynamicIcon
            family="FontAwesome"
            name="filter"
            {...iconSizeAndColor}
          />
        );
    }
  }
  return (
    <View
      style={{
        paddingVertical: 10,
        backgroundColor: commonData.colors.DARK_THEME_COLOR,
        borderTopRightRadius: 27,
        borderTopLeftRadius: 27,
        borderWidth: 0.5,
      }}>
      <HStack justifyContent="space-around">
        {actions?.map((action, i) => {
          return (
            <TouchableOpacity
              key={i}
              onPress={action.onPress}
              style={{padding: 10}}>
              {getActionButton(action.name)}
            </TouchableOpacity>
          );
        })}
      </HStack>
    </View>
  );
};

export default BottomActions;

const styles = StyleSheet.create({});
