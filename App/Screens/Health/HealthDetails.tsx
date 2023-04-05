import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import FullPage from '../../Components/Layouts/FullPage';
import {commonData} from '../../Data/static/commonData';
import BottomActions from '../../Components/BottomActions/BottomActions';

const HealthDetails = ({navigation}) => {
  return (
    <FullPage color={commonData.colors.BLACK_COLOR}>
      <View style={{flex: 1}}>
        <Text>HealthDetails</Text>
      </View>
      <BottomActions
        actions={[
          {
            name: 'back',
            onPress: function () {
              navigation.goBack();
            },
          },
          {
            name: 'home',
            onPress: function () {
              navigation.navigate('Home');
            },
          },
          // {},
        ]}
      />
    </FullPage>
  );
};

export default HealthDetails;

const styles = StyleSheet.create({});
