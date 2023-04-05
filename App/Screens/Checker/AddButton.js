import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import DynamicIcon from '../../Components/Common/DynamicIcon';
import {commonData} from '../../Data/static/commonData';

const AddButton = ({onPress}) => {
  return (
    <View style={{position: 'absolute', right: 15, bottom: 15}}>
      <TouchableOpacity
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          height: 60,
          width: 60,
          borderRadius: 50,
          backgroundColor: commonData.colors.CHECKER_SECTION_COLOR,
        }}
        onPress={onPress}>
        <DynamicIcon family="Entypo" size={20} name="plus" color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

export default AddButton;

const styles = StyleSheet.create({});
