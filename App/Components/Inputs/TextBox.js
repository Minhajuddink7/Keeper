import {StyleSheet, Text, TextInput, View} from 'react-native';
import React from 'react';

const TextBox = ({placeholder, value, setValue}) => {
  return (
    <View>
      <TextInput
        placeholder={placeholder}
        value={value}
        onChangeText={text => {
          setValue(text);
        }}
        style={styles.textBox}
        placeholderTextColor="#aaa"
      />
    </View>
  );
};

export default TextBox;

const styles = StyleSheet.create({
  textBox: {
    borderWidth: 0.5,
    borderRadius: 8,
    padding: 8,
    color: '#000',
    // backgroundColor: '#777',
  },
});
