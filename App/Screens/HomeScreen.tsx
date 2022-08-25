import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import HStack from '../Components/Layouts/HStack';
import DynamicIcon from '../Components/Common/DynamicIcon';
import Gap from '../Components/Common/Gap';
import AppText from '../Components/Typography/AppText';
import {showToast} from '../Helpers/utils';
import {commonData} from '../Data/static/commonData';
import FullPage from '../Components/Layouts/FullPage';
const {
  colors: {
    NOTES_SECTION_COLOR,
    FINANCE_SECTION_COLOR,
    HEALTH_SECTION_COLOR,
    CHECKER_SECTION_COLOR,
  },
} = commonData;
const MenuItem = ({family, name, text, size = 20}) => {
  return (
    <>
      <DynamicIcon family={family} name={name} size={size} color="#fff" />
      <Gap gap={8} />
      <AppText text={text} type="Montserrat-Bold,#fff,17" />
    </>
  );
};

function comingSoon() {
  showToast('This feature is coming soon!');
}
const HomeScreen = ({navigation}) => {
  return (
    <FullPage color={commonData.colors.DARK_THEME_COLOR}>
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
            <MenuItem family="FontAwesome5" name="pen" text="Notes" />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              ...styles.box,
              backgroundColor: FINANCE_SECTION_COLOR,
              borderTopRightRadius: 8,
            }}
            onPress={comingSoon}>
            <MenuItem
              family="FontAwesome5"
              name="money-bill-wave"
              text="Finance"
            />
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
            <MenuItem
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
            onPress={comingSoon}>
            <MenuItem
              family="FontAwesome5"
              // name="check-square-o"
              name="tasks"
              text="Checker"
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
