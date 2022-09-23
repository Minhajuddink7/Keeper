import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import HStack from '../Components/Layouts/HStack';
import DynamicIcon from '../Components/Common/DynamicIcon';
import Gap from '../Components/Common/Gap';
import AppText from '../Components/Typography/AppText';
import {showToast} from '../Helpers/utils';
import {commonData} from '../Data/static/commonData';
import FullPage from '../Components/Layouts/FullPage';
import MaterialMenu from '../Components/Common/MaterialMenu';
import {MenuDivider, MenuItem} from 'react-native-material-menu';
import {signOut} from 'firebase/auth';
import {authentication, db} from '../../firebase/firebase-config';
import {RootStateOrAny, useDispatch, useSelector} from 'react-redux';
import {changeUserState} from '../Data/redux/actions/uiActions';
import {collection, getDocs} from 'firebase/firestore/lite';
const {
  colors: {
    NOTES_SECTION_COLOR,
    FINANCE_SECTION_COLOR,
    HEALTH_SECTION_COLOR,
    CHECKER_SECTION_COLOR,
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
  const [menuVisible, setMenuVisible] = useState(false);
  const dispatch = useDispatch();
  const userLoggedIn: any = useSelector<RootStateOrAny>(
    state => state.ui.userLoggedIn,
  );

  const signOutUser = () => {
    signOut(authentication)
      .then(res => {
        dispatch(changeUserState(false));
        navigation.navigate('LoginScreen');
      })
      .catch(e => console.log(e));
  };
  const getData = async () => {
    try {
      const citiesCol = collection(db, 'notes');
      const citySnapShot = await getDocs(citiesCol);
      const cityList = citySnapShot.docs.map(doc => doc.data());
      console.log(cityList);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <FullPage color={commonData.colors.DARK_THEME_COLOR}>
      <View style={{alignItems: 'flex-end', marginRight: 15, marginTop: 15}}>
        <MaterialMenu visible={menuVisible} setVisible={setMenuVisible}>
          <MenuItem onPress={signOutUser} textStyle={{color: '#000'}}>
            Sign Out
          </MenuItem>
          <MenuDivider />
          <MenuItem onPress={() => {}} textStyle={{color: '#000'}}>
            Fetch
          </MenuItem>
          <MenuDivider />
          <MenuItem onPress={() => {}} textStyle={{color: '#000'}}>
            Push Data
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
            onPress={() => navigation.navigate('TakeNotes')}>
            <Menu family="FontAwesome5" name="pen" text="Notes" />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              ...styles.box,
              backgroundColor: FINANCE_SECTION_COLOR,
              borderTopRightRadius: 8,
            }}
            onPress={comingSoon}>
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
            onPress={comingSoon}>
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
