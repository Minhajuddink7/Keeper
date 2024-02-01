import {View, Text} from 'react-native';
import React from 'react';
import HomeScreen from '../HomeScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import TakeNotes from '../Notes/TakeNotes';
import {NavigationContainer} from '@react-navigation/native';
import NoteList from '../Notes/NoteList';
import RNBootSplash from 'react-native-bootsplash';
import NoteView from '../Notes/NoteView';
import Checkers from '../Checker/Checkers';
import EditNote from '../Notes/EditNote';
import LoginScreen from '../LoginScreen';
import {useSelector} from 'react-redux';
import Fitness from '../Health/Health';
import Health from '../Health/Health';
import HealthDetails from '../Health/HealthDetails';
import ValidatePin from '../ValidatePin';
import Finance from '../Finance/Finance';

const RootNavigator = () => {
  const userLoggedIn = useSelector(state => state.ui.userLoggedIn);
  console.log('logged in: ', userLoggedIn);
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer onReady={() => RNBootSplash.hide()}>
      <Stack.Navigator>
        {userLoggedIn ? (
          <>
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{headerShown: false}}
            />
            {/* <Stack.Screen
              name="ValidatePin"
              component={ValidatePin}
              options={{headerShown: false}}
            /> */}
          </>
        ) : (
          <>
            <Stack.Screen
              name="ValidatePin"
              component={ValidatePin}
              options={{headerShown: false}}
            />
            {/* <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{headerShown: false}}
            /> */}
          </>
        )}
        {/* <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{headerShown: false}}
        /> */}
        {/* Notes */}
        <Stack.Screen
          name="TakeNotes"
          component={TakeNotes}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="NoteList"
          component={NoteList}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="NoteView"
          component={NoteView}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="EditNote"
          component={EditNote}
          options={{headerShown: false}}
        />
        {/*  */}

        {/* Checker */}
        <Stack.Screen
          name="Checkers"
          component={Checkers}
          options={{headerShown: false}}
        />

        {/* Health */}
        <Stack.Screen
          name="Health"
          component={Health}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="HealthDetails"
          component={HealthDetails}
          options={{headerShown: false}}
        />

        {/*  */}
        {/* Health */}
        <Stack.Screen
          name="Finance"
          component={Finance}
          options={{headerShown: false}}
        />

        {/*  */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
