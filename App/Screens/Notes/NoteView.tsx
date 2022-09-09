import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import FullPage from '../../Components/Layouts/FullPage';
import AppText from '../../Components/Typography/AppText';
import BackButton from '../../Components/Buttons/BackButton';
import Container from '../../Components/Layouts/Container';

const NoteView = ({navigation, route}) => {
  const {viewedNote} = route.params;
  console.log(viewedNote);
  return (
    <FullPage color={'#000'}>
      <View style={{margin: 5}}>
        <AppText text={viewedNote} type="Montserrat-SemiBold,#fff,18" />
      </View>

      <BackButton onPress={() => navigation.goBack()} />
    </FullPage>
  );
};

export default NoteView;

const styles = StyleSheet.create({});
