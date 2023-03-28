import {ScrollView, StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {commonData} from '../../Data/static/commonData';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {RootStateOrAny, useDispatch, useSelector} from 'react-redux';
import {changeCurrentNote} from '../../Data/redux/actions/notesActions';
const NoteWriter = ({
  noteTitle,
  setNoteTitle,
  currentNote,
  setCurrentNote,
  autoFocus = true,
}) => {
  // const initNote: any = useSelector<RootStateOrAny>(
  //   state => state.notes.current_note,
  // );
  // const notes: any = useSelector<RootStateOrAny>(state => state.notes.notes);
  const dispatch = useDispatch();
  // const [noteTitle, setNoteTitle] = useState(initNote.title);
  // const [currentNote, setCurrentNote] = useState(initNote.body);
  const {DARK_THEME_COLOR, BLACK_COLOR} = commonData.colors;

  useEffect(() => {
    if (currentNote || noteTitle) {
      dispatch(
        changeCurrentNote({
          title: noteTitle,
          body: currentNote,
          isStared: false,
        }),
      );
    } else {
      dispatch(
        changeCurrentNote({
          title: '',
          body: '',
          isStared: false,
        }),
      );
    }
  }, [currentNote, noteTitle]);
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
      <View style={{backgroundColor: BLACK_COLOR, padding: 5, flex: 1}}>
        <TextInput
          multiline={true}
          autoCorrect={false}
          // numberOfLines={70}
          placeholderTextColor="#556"
          placeholder="Start taking notes...."
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
      </View>
    </>
  );
};

export default NoteWriter;

const styles = StyleSheet.create({});
