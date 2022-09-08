import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import FullPage from '../../Components/Layouts/FullPage';
import AppText from '../../Components/Typography/AppText';

const NoteView = ({navigation}) => {
  return (
    <FullPage>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <AppText text="Note View" type=",#000," />
      </TouchableOpacity>
    </FullPage>
  );
};

export default NoteView;

const styles = StyleSheet.create({});
