import {Keyboard, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import FullPage from '../../Components/Layouts/FullPage';
import NoteWriter from './NoteWriter';
import BackButton from '../../Components/Buttons/BackButton';
import UpdateButton from '../../Components/Buttons/UpdateButton';
import {RootStateOrAny, useDispatch, useSelector} from 'react-redux';
import {changeNotes} from '../../Data/redux/actions/notesActions';
import {showToast} from '../../Helpers/utils';

const EditNote = ({navigation, route}) => {
  const {note} = route.params;
  const dispatch = useDispatch();
  const notes: any = useSelector<RootStateOrAny>(state => state.notes.notes);
  const [noteTitle, setNoteTitle] = useState(note.title);
  const [currentNote, setCurrentNote] = useState(note.body);
  const writerProps = {
    noteTitle,
    setNoteTitle,
    currentNote,
    setCurrentNote,
    autoFocus: true,
  };

  const [keyboardShow, setKeyboardShow] = useState(false);
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardShow(true);
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardShow(false);
      },
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);
  const updateNote = () => {
    if (note.title === noteTitle && note.body === currentNote) {
      showToast('No changes are made!');
      navigation.goBack();
      return;
    }
    const id = note.id;
    const noteIndex = notes.findIndex(note => note.id === id);
    const updatedNote = {
      ...notes.find(note => note.id === id),
      title: noteTitle,
      body: currentNote,
    };
    const newNotes = [...notes];
    newNotes.splice(noteIndex, 1, updatedNote);
    dispatch(changeNotes(newNotes));
    showToast('Note Updated!');
    navigation.goBack();
  };
  return (
    <FullPage color="#000">
      <NoteWriter {...writerProps} />
      {!keyboardShow ? (
        <>
          <BackButton navigation={navigation} color="red" />
          <UpdateButton navigation={navigation} onUpdate={updateNote} />
        </>
      ) : null}
    </FullPage>
  );
};

export default EditNote;

const styles = StyleSheet.create({});
