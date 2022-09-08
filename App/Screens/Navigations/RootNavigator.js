import {View, Text} from 'react-native';
import React from 'react';
import HomeScreen from '../HomeScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import TakeNotes from '../Notes/TakeNotes';
import {NavigationContainer} from '@react-navigation/native';
import NoteList from '../Notes/NoteList';
import RNBootSplash from 'react-native-bootsplash';
import NoteView from '../Notes/NoteView';

const RootNavigator = () => {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer onReady={() => RNBootSplash.hide()}>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{headerShown: false}}
        />

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
        {/*  */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
