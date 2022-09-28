import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import FullPage from '../../Components/Layouts/FullPage';
import AppText from '../../Components/Typography/AppText';
import BackButton from '../../Components/Buttons/BackButton';
import Container from '../../Components/Layouts/Container';
import {commonData} from '../../Data/static/commonData';
import BottomActions from '../../Components/BottomActions/BottomActions';

const NoteView = ({navigation, route}) => {
  const {viewedNote} = route.params;
  const {
    fonts: {BOLD},
  } = commonData;
  return (
    <FullPage color={'#000'}>
      <ScrollView style={{margin: 5}}>
        <AppText
          text={viewedNote?.title || '[ Untitled ]'}
          type={`${BOLD},#fff,20`}
          ta="center"
          td={viewedNote?.title ? 'underline' : 'none'}
        />
        <AppText text={viewedNote?.body} type={`Kalam-Regular,#fff,18`} />
      </ScrollView>
      <BottomActions
        actions={[
          {
            name: 'back',
            onPress: function () {
              navigation.goBack();
            },
          },
          {},
          {},
          // {
          //   name: 'home',
          //   onPress: function () {
          //     navigation.navigate('Home');
          //   },
          // },
          // // {},
          // {
          //   name: 'update',
          //   onPress: updateNote,
          // },
        ]}
      />
      {/* <BackButton navigation={navigation} /> */}
    </FullPage>
  );
};

export default NoteView;

const styles = StyleSheet.create({});
