import {StyleSheet, View} from 'react-native';
import React from 'react';

const VStack = ({alignItems, justifyContent, children}) => {
  return <View style={{justifyContent, alignItems}}>{children}</View>;
};

export default VStack;

const styles = StyleSheet.create({});
