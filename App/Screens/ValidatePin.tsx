import {
  Button,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import FullPage from '../Components/Layouts/FullPage';
import AppText from '../Components/Typography/AppText';
import {commonData} from '../Data/static/commonData';
// import {VirtualKeyboard} from 'react-native-screen-keyboard';
// import {
//   createUserWithEmailAndPassword,
//   signInWithEmailAndPassword,
//   signOut,
// } from 'firebase/auth';
// import {authentication} from '../../firebase/firebase-config';
import TextLink from '../Components/Typography/TextLink';
import Gap from '../Components/Common/Gap';
import {useDispatch} from 'react-redux';
import {changeUserState} from '../Data/redux/actions/uiActions';
import {showToast} from '../Helpers/utils';
import HStack from '../Components/Layouts/HStack';

const ValidatePin = ({navigation}) => {
  const [currentScreen, setCurrentScreen] = useState('signin');
  const [email, setEmail] = useState('');

  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    if (password.length == 4) {
      if (password == '6464') {
        dispatch(changeUserState(true));
      } else {
        showToast('Wrong PIN!');
        setPassword('');
      }
    }
  }, [password]);
  const keyDown = key => {
    console.log(key);
  };

  return (
    <FullPage color={'#000'}>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          flex: 1,
          //   backgroundColor: 'red',
        }}>
        <AppText text="Enter Your PIN below" type=",#fff,24" />
        {/* <VirtualKeyboard keyDown={keyDown} /> */}
        <TextInput
          placeholder="PIN"
          keyboardType="numeric"
          secureTextEntry={true}
          style={styles.inputBox}
          value={password}
          keyboardAppearance="default"
          onChangeText={text => {
            setPassword(text);
          }}
        />
      </View>
      <HStack justifyContent="flex-end">
        <AppText text="Keeper Version: 1.0.3  " type=",#fff," />
      </HStack>
    </FullPage>
  );
};

export default ValidatePin;

const styles = StyleSheet.create({
  inputBox: {
    width: '70%',
    margin: 'auto',
    borderWidth: 0.5,
    borderColor: 'white',
    borderStyle: 'dashed',
    fontFamily: 'Kalam-Regular',
    borderRadius: 8,
    marginVertical: 10,
    paddingLeft: 15,
    color: '#fff',
    // height: 80,
    fontSize: 30,
  },
});
