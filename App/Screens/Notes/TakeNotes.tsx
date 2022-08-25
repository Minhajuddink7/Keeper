import {ScrollView, StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useState} from 'react';
import {FloatingAction} from 'react-native-floating-action';
import DynamicIcon from '../../Components/Common/DynamicIcon';
import FullPage from '../../Components/Layouts/FullPage';
import {commonData} from '../../Data/static/commonData';

const TakeNotes = ({navigation}) => {
  const actions = [
    {
      text: 'Create New',
      color: 'green',
      textBackground: 'green',
      textColor: '#fff',
      icon: <DynamicIcon family="AntDesign" name="plus" size={18} />,
      // icon: require('./images/ic_accessibility_white.png'),
      name: 'ADD_NOTE',
    },
    {
      text: 'Note List',
      color: 'orange',
      textBackground: 'orange',
      textColor: '#fff',
      icon: <DynamicIcon family="Feather" name="list" size={18} />,
      // icon: require('./images/ic_language_white.png'),
      name: 'NOTES_LIST',
    },
  ];
  const [currentNote, setCurrentNote] = useState('');
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
            setCurrentNote('');
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
