import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  PermissionsAndroid,
  Linking,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import HStack from '../Components/Layouts/HStack';
import DynamicIcon from '../Components/Common/DynamicIcon';
import Gap from '../Components/Common/Gap';
import AppText from '../Components/Typography/AppText';
import {showToast} from '../Helpers/utils';
import {commonData} from '../Data/static/commonData';
import FullPage from '../Components/Layouts/FullPage';
import MaterialMenu from '../Components/Common/MaterialMenu';
import {MenuDivider, MenuItem} from 'react-native-material-menu';
// import {signOut} from 'firebase/auth';
// import {authentication, db} from '../../firebase/firebase-config';
import {RootStateOrAny, useDispatch, useSelector, useStore} from 'react-redux';
import {changeUserState} from '../Data/redux/actions/uiActions';
// import {collection, getDocs} from 'firebase/firestore/lite';
import RNFS from 'react-native-fs';
import {
  changeCurrentNote,
  changeNoteLabels,
  changeNotes,
} from '../Data/redux/actions/notesActions';
import {
  changeAffirmations,
  changeList,
  changeQuotes,
  changeTodos,
} from '../Data/redux/actions/checkerActions';
// import store from '../Data/redux/store';
// import {useFocusEffect} from '@react-navigation/native';

const {
  colors: {
    NOTES_SECTION_COLOR,
    FINANCE_SECTION_COLOR,
    HEALTH_SECTION_COLOR,
    CHECKER_SECTION_COLOR,
    MANAGE_SECTION_COLOR,
    LIFE_SECTION_COLOR,
  },
} = commonData;
const Menu = ({family, name, text, size = 20}) => {
  return (
    <>
      <DynamicIcon family={family} name={name} size={size} color="#fff" />
      <Gap gap={8} />
      <AppText text={text} type={`${commonData.fonts.BOLD},#fff,17`} />
    </>
  );
};

function comingSoon() {
  showToast('This feature is coming soon!');
}
const HomeScreen = ({navigation}) => {
  const getStore = useStore();
  // useFocusEffect(
  //   useCallback(() => {
  //     console.log('store: ', JSON.stringify(getStore.getState()));
  //   }, []),
  // );
  // const path = RNFS.ExternalStorageDirectoryPath + '/keeper_app_db.json';
  const path = RNFS.DownloadDirectoryPath + '/keeper_app_db.json';

  const [menuVisible, setMenuVisible] = useState(false);
  const [localData, setLocalData]: any = useState();
  const dispatch = useDispatch();
  // const userLoggedIn: any = useSelector<RootStateOrAny>(
  //   state => state.ui.userLoggedIn,
  // );

  const signOutUser = () => {
    console.log('sdf');
    dispatch(changeUserState(false));
    // signOut(authentication)
    //   .then(res => {
    //     dispatch(changeUserState(false));
    //     navigation.navigate('LoginScreen');
    //   })
    //   .catch(e => console.log(e));
  };
  // const getData = async () => {
  //   try {
  //     const citiesCol = collection(db, 'notes');
  //     const citySnapShot = await getDocs(citiesCol);
  //     const cityList = citySnapShot.docs.map(doc => doc.data());
  //     console.log(cityList);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const saveToPhone = async () => {
    try {
      await RNFS.writeFile(path, JSON.stringify(getStore.getState()), 'utf8');
      setMenuVisible(false);
      showToast('Data saved in your phone!');
      // console.log('Success!');
    } catch (error) {
      showToast(JSON.stringify(error));
      console.log(error);
    }
    console.log('path: ', path);
  };
  // const requestPermission = async () => {
  //   console.log('hello');
  //   try {
  //     const granted = await PermissionsAndroid.request(
  //       PermissionsAndroid.PERMISSIONS.CAMERA,
  //       {
  //         title: 'Cool Photo App Camera Permission',
  //         message:
  //           'Cool Photo App needs access to your camera ' +
  //           'so you can take awesome pictures.',
  //         buttonNeutral: 'Ask Me Later',
  //         buttonNegative: 'Cancel',
  //         buttonPositive: 'OK',
  //       },
  //     );
  //     if (granted === PermissionsAndroid.RESULTS.GRANTED) {
  //       console.log('You can use the camera');
  //     } else {
  //       console.log('Camera permission denied');
  //     }
  //   } catch (err) {
  //     console.warn(err);
  //   }
  // };
  const readFromPhone = async () => {
    RNFS.readFile(RNFS.DownloadDirectoryPath + '/keeper_app_db.json', 'ascii')
      .then(res => {
        // console.log(res);
        // const d = JSON.parse(res);
        setLocalData(JSON.parse(res));
        setMenuVisible(false);
        showToast('Data fetched from phone!');
        // console.log('data ddd', JSON.parse(res));
        // this.setState({ co/ntent: res, fruitType: d.type });
      })
      .catch(err => {
        // Linking.openSettings();
        // showToast('Error Occured');
        showToast(JSON.stringify(err));
        console.log(err.message, err.code);
      });
  };
  useEffect(() => {
    if (localData) {
      dispatch(changeNotes(localData.notes.notes));
      dispatch(changeNoteLabels(localData.notes.labels));
      const {title, body, isStared} = localData.notes.current_note;
      dispatch(
        changeCurrentNote({
          title,
          body,
          isStared,
        }),
      );
      dispatch(changeQuotes(localData.checker.quotes));
      dispatch(changeTodos(localData.checker.todos));
      dispatch(changeAffirmations(localData.checker.affirmations));
      dispatch(changeList(localData.checker.lists));
      // dispatch(changeCurrentNote(localData.notes.notes));
    }
    // getData();
  }, [localData]);
  // const askPermission = () => {
  //   PermissionsAndroid.request(
  //     PermissionsAndroid.PERMISSIONS.MANAGE_EXTERNAL_STORAGE,
  //   );
  // };
  // useEffect(() => {
  //   askPermission();
  // }, []);
  return (
    <FullPage color={commonData.colors.DARK_THEME_COLOR}>
      <View style={{alignItems: 'flex-end', marginRight: 15, marginTop: 15}}>
        <MaterialMenu visible={menuVisible} setVisible={setMenuVisible}>
          <MenuItem onPress={signOutUser} textStyle={{color: '#000'}}>
            Sign Out
          </MenuItem>
          <MenuDivider />
          <MenuItem onPress={readFromPhone} textStyle={{color: '#000'}}>
            Fetch Data
          </MenuItem>
          <MenuDivider />
          <MenuItem onPress={saveToPhone} textStyle={{color: '#000'}}>
            Save Data
          </MenuItem>
        </MaterialMenu>
      </View>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <HStack>
          <TouchableOpacity
            style={{
              ...styles.box,
              backgroundColor: NOTES_SECTION_COLOR,
              borderTopLeftRadius: 8,
            }}
            onPress={() => navigation.navigate('NoteList')}>
            <Menu family="FontAwesome5" name="pen" text="Notes" />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              ...styles.box,
              backgroundColor: FINANCE_SECTION_COLOR,
              borderTopRightRadius: 8,
            }}
            // onPress={comingSoon}>

            onPress={() => navigation.navigate('Finance')}>
            <Menu family="FontAwesome5" name="money-bill-wave" text="Finance" />
          </TouchableOpacity>
        </HStack>
        <HStack>
          <TouchableOpacity
            style={{
              ...styles.box,
              backgroundColor: HEALTH_SECTION_COLOR,
              borderBottomLeftRadius: 8,
            }}
            onPress={() => navigation.navigate('Health')}>
            <Menu
              family="FontAwesome5"
              name="heartbeat"
              text="Health"
              size={23}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              ...styles.box,
              backgroundColor: CHECKER_SECTION_COLOR,
              borderBottomRightRadius: 8,
            }}
            onPress={() => navigation.navigate('Checkers')}>
            <Menu
              family="FontAwesome5"
              // name="check-square-o"
              name="tasks"
              text="Checkers"
              size={23}
            />
          </TouchableOpacity>
        </HStack>
        {/* <HStack>
          <TouchableOpacity
            style={{
              ...styles.box,
              backgroundColor: LIFE_SECTION_COLOR,
              borderBottomLeftRadius: 8,
            }}
            onPress={comingSoon}>
            <Menu family="FontAwesome" name="heart" text="Love" size={23} />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              ...styles.box,
              backgroundColor: MANAGE_SECTION_COLOR,
              borderBottomRightRadius: 8,
            }}
            onPress={comingSoon}
            //  onPress={() => navigation.navigate('Checkers')}
          >
            <Menu
              family="FontAwesome5"
              // name="check-square-o"
              name="cogs"
              text="Manage"
              size={23}
            />
          </TouchableOpacity>
        </HStack> */}
      </View>
    </FullPage>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  box: {
    height: 150,
    width: 150,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
