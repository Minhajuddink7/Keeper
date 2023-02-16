import {
  Keyboard,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
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
import {showToast} from '../../Helpers/utils';
import HomeButton from '../../Components/Buttons/HomeButton';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import NoteList from './NoteList';
import NoteWriter from './NoteWriter';
import BottomActions from '../../Components/BottomActions/BottomActions';

const TakeNotes = ({navigation}) => {
  const {
    fonts: {MEDIUM, BOLD},
    colors: {
      DARK_THEME_COLOR,
      BLACK_COLOR,
      FINANCE_SECTION_COLOR,
      NOTES_SECTION_COLOR,
    },
  } = commonData;
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
    // {
    //   text: 'Note List',
    //   color: 'orange',
    //   textBackground: 'orange',
    //   textColor: '#fff',
    //   icon: <DynamicIcon family="Feather" name="list" size={18} />,
    //   name: 'NOTES_LIST',
    // },
  ];
  // const [noteTitle, setNoteTitle] = useState(initNote.title);
  // const [currentNote, setCurrentNote] = useState(initNote.body);

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

  // useEffect(() => {
  //   if (currentNote || noteTitle) {
  //     dispatch(
  //       changeCurrentNote({
  //         title: noteTitle,
  //         body: currentNote,
  //         isStared: false,
  //       }),
  //     );
  //   } else {
  //     dispatch(
  //       changeCurrentNote({
  //         title: '',
  //         body: '',
  //         isStared: false,
  //       }),
  //     );
  //   }
  // }, [currentNote, noteTitle]);

  // const saveAndAddNew = async () => {
  //   if (!currentNote) {
  //     showToast('Please take notes first!');
  //     return;
  //   }
  //   const note = {
  //     id: Date.now(),
  //     title: noteTitle,
  //     body: currentNote,
  //     isStared: false,
  //   };
  //   const newNotes = [note, ...notes];
  //   dispatch(changeNotes(newNotes));
  //   showToast('Note Saved!');
  //   setCurrentNote('');
  //   setNoteTitle('');
  // };
  return (
    <FullPage color={BLACK_COLOR}>
      <NoteWriter
      // {...writerProps}
      />

      {!keyboardShow ? (
        <BottomActions
          actions={[
            {
              name: 'home',
              onPress: function () {
                navigation.navigate('Home');
              },
            },
            {
              name: 'lists',
              onPress: function () {
                navigation.navigate('NoteList');
              },
            },
            {
              name: 'add',
              // onPress: saveAndAddNew,
            },
          ]}
        />
      ) : null}
    </FullPage>
  );
};

export default TakeNotes;

const styles = StyleSheet.create({});
