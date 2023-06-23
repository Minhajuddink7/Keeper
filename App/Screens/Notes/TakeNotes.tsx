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
  addNoteLabel,
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
import NormalModal from '../../Components/Common/modals/NormalModal';
import AppText from '../../Components/Typography/AppText';
import {MenuDivider} from 'react-native-material-menu';
import FullButton from '../../Components/Buttons/FullButton';
import Gap from '../../Components/Common/Gap';
import Container from '../../Components/Layouts/Container';
import BottomModal from '../../Components/Common/modals/BottomModal';
import HStack from '../../Components/Layouts/HStack';
const {NOTES_SECTION_COLOR} = commonData.colors;
const LabelSelector = ({text, selected, setSelected}) => {
  return (
    <>
      <View
        style={{
          flexDirection: 'row',
          paddingVertical: 10,
          marginHorizontal: '6%',
          justifyContent: 'space-between',
        }}>
        <AppText text={text} type="Kalam-Regular,#fff,18" ta="center" mr={10} />
        {/* {selected === text ? ( */}
        <HStack>
          {/* <TouchableOpacity>
            <DynamicIcon
              color="#fff"
              family="FontAwesome5"
              name="trash"
              size={18}
            />
          </TouchableOpacity> */}
          <TouchableOpacity
            style={{
              height: 25,
              width: 25,
              borderRadius: 6,
              marginLeft: 15,
              // borderRadius: 25 / 2,
              alignItems: 'center',
              justifyContent: 'center',
              borderWidth: 1,
              borderColor: NOTES_SECTION_COLOR,
              backgroundColor: selected === text ? NOTES_SECTION_COLOR : '#fff',
            }}
            onPress={() => {
              setSelected(text);
            }}>
            <DynamicIcon color="#fff" family="FontAwesome5" name="check" />
          </TouchableOpacity>
        </HStack>
        {/* ) : null} */}
      </View>
      <MenuDivider color="#fff" />
    </>
  );
};
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
  const [labelModalOpen, setLabelModalOpen] = useState(false);
  const [selectedLabel, setSelectedLabel] = useState('');
  const labels: any = useSelector<RootStateOrAny>(state => state.notes.labels);

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
  const [noteTitle, setNoteTitle] = useState(initNote.title);
  const [currentNote, setCurrentNote] = useState(initNote.body);
  const [keyboardShow, setKeyboardShow] = useState(false);
  const [enteredLabel, setEnteredLabel] = useState('');

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

  // const currentNote = useSelector<RootStateOrAny>(
  //   state => state.notes.current_note,
  // );

  const saveAndAddNew = async () => {
    if (!currentNote) {
      showToast('Please take notes first!');
      return;
    }
    const note = {
      id: Date.now(),
      title: noteTitle,
      body: currentNote,
      isStared: false,
      label: selectedLabel,
    };
    const newNotes = [note, ...notes];
    dispatch(changeNotes(newNotes));
    showToast('Note Saved!');
    setCurrentNote('');
    setNoteTitle('');
    setEnteredLabel('');
    setSelectedLabel('');
    setLabelModalOpen(false);
  };

  const saveAction = () => {
    if (!currentNote) {
      showToast('Please take notes first!');
      return;
    }
    setLabelModalOpen(true);
    console.log('saved');
  };

  const addLabel = () => {
    if (!enteredLabel) {
      showToast('Please enter a label!');
      return;
    }
    dispatch(addNoteLabel(enteredLabel));
    setEnteredLabel('');
  };
  return (
    <FullPage color={BLACK_COLOR}>
      <NoteWriter
        autoFocus={true}
        noteTitle={noteTitle}
        setNoteTitle={setNoteTitle}
        currentNote={currentNote}
        setCurrentNote={setCurrentNote}
        //  {...writerProps}
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
              onPress: saveAction,
            },
          ]}
        />
      ) : null}
      <BottomModal
        // flex={0}
        // visible={labelModalOpen}
        // setVisible={setLabelModalOpen}>
        modalOpen={labelModalOpen}
        setModalOpen={setLabelModalOpen}>
        {/* <Gap /> */}
        <View
          style={{
            borderWidth: 0.2,
            borderColor: commonData.colors.NOTES_SECTION_COLOR,
            maxHeight: '70%',
            backgroundColor: '#222',
            borderTopLeftRadius: 16,
            borderTopRightRadius: 16,
            paddingTop: 10,
          }}>
          <AppText text="Add Label" type="Kalam-Bold,#bbb,24" ta="center" />
          <MenuDivider />
          <MenuDivider />
          <MenuDivider />
          {/* <LabelSelector
          text="All Notes"
          selected={selectedLabel}
          setSelected={setSelectedLabel}
        /> */}
          <Gap gap={10} />
          <View
            style={{
              marginHorizontal: '6%',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <TouchableOpacity onPress={addLabel}>
              <DynamicIcon
                style={{marginRight: 10}}
                family="FontAwesome5"
                name="plus"
                color="#bbb"
                size={16}
              />
            </TouchableOpacity>
            <TextInput
              placeholder="Enter New Label"
              placeholderTextColor="#777"
              autoFocus
              style={{
                fontFamily: 'Kalam-Bold',
                fontSize: 16,
                color: '#ddd',
                flex: 1,
              }}
              value={enteredLabel}
              onChangeText={text => {
                setEnteredLabel(text);
              }}
            />
          </View>
          <Gap gap={10} />
          <ScrollView>
            {labels?.map((label: string, i: number) => {
              return (
                <LabelSelector
                  text={label}
                  key={i}
                  selected={selectedLabel}
                  setSelected={setSelectedLabel}
                />
              );
            })}
          </ScrollView>

          <Gap />

          <FullButton
            color={NOTES_SECTION_COLOR}
            text="Save Note"
            method={saveAndAddNew}
          />
          <Gap />
        </View>
      </BottomModal>
    </FullPage>
  );
};

export default TakeNotes;

const styles = StyleSheet.create({});
