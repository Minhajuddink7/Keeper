import {ScrollView, StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {FloatingAction} from 'react-native-floating-action';
import DynamicIcon from '../../Components/Common/DynamicIcon';
import FullPage from '../../Components/Layouts/FullPage';
import {commonData} from '../../Data/static/commonData';
import {RootStateOrAny, useDispatch, useSelector} from 'react-redux';
import {
  changeCurrentNote,
  changeNotes,
} from '../../Data/redux/actions/notesActions';
import moment from 'moment';

const TakeNotes = ({navigation}) => {
  const initNote: any = useSelector<RootStateOrAny>(
    state => state.notes.current_note,
  );
  const notes: any = useSelector<RootStateOrAny>(state => state.notes.notes);

  const dispatch = useDispatch();
  const actions = [
    {
      text: 'Save & Add New',
      color: 'green',
      textBackground: 'green',
      textColor: '#fff',
      icon: <DynamicIcon family="AntDesign" name="plus" size={18} />,
      name: 'ADD_NOTE',
    },
    {
      text: 'Note List',
      color: 'orange',
      textBackground: 'orange',
      textColor: '#fff',
      icon: <DynamicIcon family="Feather" name="list" size={18} />,
      name: 'NOTES_LIST',
    },
  ];
  const [noteTitle, setNoteTitle] = useState(initNote.title);
  const [currentNote, setCurrentNote] = useState(initNote.body);

  useEffect(() => {
    if (currentNote || noteTitle) {
      dispatch(changeCurrentNote({title: noteTitle, body: currentNote}));
    }
  }, [currentNote, noteTitle]);

  const saveAndAddNew = () => {
    const note = {id: Date.now(), title: noteTitle, body: currentNote};
    const newNotes = [...notes, note];
    dispatch(changeNotes(newNotes));
  };
  return (
    <FullPage color={commonData.colors.DARK_THEME_COLOR}>
      <TextInput
        style={{
          color: '#fff',
          fontSize: 22,
          fontFamily: 'Montserrat-SemiBold',
          textAlign: 'center',
          textDecorationLine: 'underline',
          backgroundColor: '#223',
        }}
        value={noteTitle}
        onChangeText={text => setNoteTitle(text)}
        placeholder="Note title"
      />
      <ScrollView style={{backgroundColor: '#334', padding: 5}}>
        <TextInput
          multiline={true}
          style={{
            color: '#fff',
            fontSize: 20,
            fontFamily: 'Montserrat-Medium',
          }}
          autoFocus={true}
          value={currentNote}
          onChangeText={text => setCurrentNote(text)}
        />
      </ScrollView>
      <FloatingAction
        actions={actions}
        onPressItem={name => {
          if (name === 'ADD_NOTE') {
            saveAndAddNew();
          } else if (name === 'NOTES_LIST') {
            navigation.navigate('NoteList');
          }
        }}
      />
    </FullPage>
  );
};

export default TakeNotes;

const styles = StyleSheet.create({});
