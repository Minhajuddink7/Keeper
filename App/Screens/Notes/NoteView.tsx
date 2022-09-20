import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import FullPage from '../../Components/Layouts/FullPage';
import AppText from '../../Components/Typography/AppText';
import BackButton from '../../Components/Buttons/BackButton';
import Container from '../../Components/Layouts/Container';
import {commonData} from '../../Data/static/commonData';

const NoteView = ({navigation, route}) => {
  const {viewedNote} = route.params;
  const {
    fonts: {BOLD},
  } = commonData;
  return (
    <FullPage color={'#000'}>
      <View style={{margin: 5}}>
        <AppText
          text={viewedNote?.title || '[ Untitled ]'}
          type={`${BOLD},#fff,20`}
          ta="center"
          td={viewedNote?.title ? 'underline' : 'none'}
        />
        <AppText text={viewedNote?.body} type={`Kalam-Regular,#fff,18`} />
      </View>

      <BackButton navigation={navigation} />
    </FullPage>
  );
};

export default NoteView;

const styles = StyleSheet.create({});
