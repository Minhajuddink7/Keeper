import {StyleSheet, Text, useWindowDimensions, View} from 'react-native';
import React, {useState} from 'react';
import FullPage from '../../Components/Layouts/FullPage';
import BottomActions from '../../Components/BottomActions/BottomActions';
import {commonData} from '../../Data/static/commonData';
import {SceneMap, TabBar, TabView} from 'react-native-tab-view';
import Fitness from './Fitness';

const Health = ({navigation}) => {
  const [index, setIndex] = useState(0);
  const layout = useWindowDimensions();
  const {
    BLACK_COLOR,
    DARK_THEME_COLOR,
    CHECKER_SECTION_COLOR,
    HEALTH_SECTION_COLOR,
  } = commonData.colors;
  const [routes] = React.useState([
    {key: 'first', title: 'Fitness'},
    {key: 'second', title: 'Relaxation'},
    {key: 'third', title: 'Fun'},
    // {key: 'fourth', title: 'Eating'},
  ]);
  const FirstRoute = () => {
    return <Fitness navigation={navigation} />;
  };
  const SecondRoute = () => {
    return <View></View>;
  };
  const ThirdRoute = () => {
    return <View></View>;
  };

  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
    third: ThirdRoute,
    fourth: ThirdRoute,
  });

  const renderTabBar = props => {
    return (
      <TabBar
        {...props}
        indicatorStyle={{backgroundColor: HEALTH_SECTION_COLOR}}
        style={{backgroundColor: DARK_THEME_COLOR}}
        renderLabel={({route, focused, color}) => (
          <Text style={{color, fontSize: 18, fontFamily: 'Kalam-Bold'}}>
            {route.title}
          </Text>
        )}
        // renderIcon={({route, focused, color}) => {
        //   return (
        //     <DynamicIcon
        //       color={color}
        //       family="FontAwesome"
        //       name={route.key === 'first' ? 'th-list' : 'star'}
        //     />
        //   );
        // }}
      />
    );
  };

  return (
    <FullPage color={commonData.colors.BLACK_COLOR}>
      <View style={{flex: 1}}>
        <TabView
          navigationState={{index, routes}}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={{width: layout.width}}
          renderTabBar={renderTabBar}
        />
      </View>
      <BottomActions
        actions={[
          // {
          //   name: 'back',
          //   onPress: function () {
          //     navigation.goBack();
          //   },
          // },
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

export default Health;

const styles = StyleSheet.create({});
