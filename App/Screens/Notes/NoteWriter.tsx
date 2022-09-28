import {ScrollView, StyleSheet, Text, TextInput, View} from 'react-native';
import React from 'react';
import {commonData} from '../../Data/static/commonData';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
const NoteWriter = ({
  noteTitle,
  setNoteTitle,
  currentNote,
  setCurrentNote,
  autoFocus,
}) => {
  const {DARK_THEME_COLOR, BLACK_COLOR} = commonData.colors;
  return (
    <>
      <TextInput
        style={{
          color: '#fff',
          fontSize: 20,
          // fontFamily: BOLD,
          fontFamily: 'Kalam-Bold',
          textAlign: 'center',
          textDecorationLine: 'underline',
          backgroundColor: DARK_THEME_COLOR,
        }}
        placeholderTextColor="#556"
        value={noteTitle}
        onChangeText={text => setNoteTitle(text)}
        placeholder="Note title"
      />
      <ScrollView style={{backgroundColor: BLACK_COLOR, padding: 5}}>
        <TextInput
          multiline={true}
          numberOfLines={70}
          style={{
            color: '#fff',
            // marginTop: -910,
            fontSize: 20,
            // fontFamily: MEDIUM,
            // borderWidth: 1,
            // borderColor: '#000',
            fontFamily: 'Kalam-Regular',
            // backgroundColor: 'red',
          }}
          autoFocus={autoFocus}
          value={currentNote}
          onChangeText={text => setCurrentNote(text)}
        />
      </ScrollView>
    </>
  );
};

export default NoteWriter;

const styles = StyleSheet.create({});
