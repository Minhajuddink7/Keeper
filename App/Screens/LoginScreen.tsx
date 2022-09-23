import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import FullPage from '../Components/Layouts/FullPage';
import AppText from '../Components/Typography/AppText';
import {commonData} from '../Data/static/commonData';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import {authentication} from '../../firebase/firebase-config';
import TextLink from '../Components/Typography/TextLink';
import Gap from '../Components/Common/Gap';
import {useDispatch} from 'react-redux';
import {changeUserState} from '../Data/redux/actions/uiActions';

const LoginScreen = ({navigation}) => {
  const [currentScreen, setCurrentScreen] = useState('signin');
  const [email, setEmail] = useState('');

  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const register = () => {
    if (email && password) {
      createUserWithEmailAndPassword(authentication, email, password)
        .then(res => {
          setCurrentScreen('signin');
        })
        .catch(e => console.log(e));
    }
  };
  const signin = () => {
    signInWithEmailAndPassword(authentication, email, password)
      .then(res => {
        dispatch(changeUserState(true));
        navigation.navigate('Home');
      })
      .catch(e => console.log(e));
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
        <TextInput
          placeholder="Username"
          style={styles.inputBox}
          value={email}
          onChangeText={text => {
            setEmail(text);
          }}
        />
        <TextInput
          placeholder="Password"
          secureTextEntry={true}
          style={styles.inputBox}
          value={password}
          onChangeText={text => {
            setPassword(text);
          }}
        />
        {currentScreen === 'register' ? (
          <TouchableOpacity
            style={{
              backgroundColor: '#002B9B',
              width: '70%',
              borderRadius: 8,
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 10,
              paddingVertical: 15,
            }}
            onPress={register}>
            <AppText text="Register" type=",#ccc,18" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={{
              backgroundColor: '#002B9B',
              width: '70%',
              borderRadius: 8,
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 10,
              paddingVertical: 15,
            }}
            onPress={signin}>
            <AppText text="Sign In" type=",#ccc,18" />
          </TouchableOpacity>
        )}
        <Gap />
        {currentScreen === 'register' ? (
          <TextLink
            text="Already registered? Sign In."
            onPress={() => setCurrentScreen('singin')}
          />
        ) : (
          <TextLink
            text="Don't have account? Register."
            onPress={() => setCurrentScreen('register')}
          />
        )}
      </View>
    </FullPage>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  inputBox: {
    width: '70%',
    margin: 'auto',
    borderWidth: 1,
    borderColor: '#002B9B',
    fontFamily: 'Kalam-Regular',
    borderRadius: 8,
    marginVertical: 10,
    paddingLeft: 15,
  },
});
