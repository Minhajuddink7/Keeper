import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import AppText from '../../Components/Typography/AppText';
import {commonData} from '../../Data/static/commonData';
const {HEALTH_SECTION_COLOR} = commonData.colors;
const Fitness = ({navigation}) => {
  return (
    <ScrollView>
      {/* {[1, 2, 3, 4, 5]?.map(() => {
        return (
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('HealthDetails')}>
            <AppText
              text="Calisthenics:"
              type="Kalam-Bold,#999,22"
              td="underline"
            />
            <AppText text="1. Daily Pushups" type="Kalam-Bold,#ddd,16" />
            <AppText text="2. Posture Workout" type="Kalam-Bold,#ddd,16" />
            <AppText text="3. Hanging and pullups" type="Kalam-Bold,#ddd,16" />
          </TouchableOpacity>
        );
      })} */}
    </ScrollView>
  );
};

export default Fitness;

const styles = StyleSheet.create({
  card: {
    // backgroundColor: commonData.colors.HEALTH_SECTION_COLOR,
    backgroundColor: '#333',
    borderWidth: 0.5,
    borderColor: HEALTH_SECTION_COLOR,
    padding: 12,
    margin: 10,
    borderRadius: 6,
  },
});
