import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';
import React from 'react';
import moment from 'moment';
//   import DynamicIcon from '../components/Common/DynamicIcon';
// import HStack from '../components/Layouts/Hstack';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import DynamicIcon from '../../Components/Common/DynamicIcon';
import NoteCard from '../../Components/Note-List/NoteCard';
import {RootStateOrAny, useSelector} from 'react-redux';
//   import NoteCard from '../components/Note-List/NoteCard';

const FirstRoute = () => {
  // const notes=useSelector(state=>state.notes.)
  const notes: any = useSelector<RootStateOrAny>(state => state.notes.notes);
  return (
    <View style={{flex: 1}}>
      <ScrollView style={{backgroundColor: '#334', paddingTop: 15}}>
        {notes?.map((note: any) => {
          return <NoteCard key={note.id} note={note} />;
        })}
      </ScrollView>
    </View>
  );
};
const SecondRoute = () => {
  return (
    <View style={{flex: 1}}>
      <ScrollView style={{backgroundColor: '#334', paddingTop: 15}}>
        {/* <NoteCard /> */}
      </ScrollView>
    </View>
  );
};
const renderScene = SceneMap({
  first: FirstRoute,
  second: SecondRoute,
});

const NoteList = () => {
  // console.log(moment(Date.now()).format('DD-MM-YY'));
  const layout = useWindowDimensions();
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'first', title: 'All Notes'},
    {key: 'second', title: 'Stared'},
  ]);

  const renderTabBar = props => {
    return (
      <TabBar
        {...props}
        indicatorStyle={{backgroundColor: 'white'}}
        style={{backgroundColor: '#223'}}
        renderIcon={({route, focused, color}) => {
          return (
            <DynamicIcon
              color={color}
              family="FontAwesome5"
              name={route.key === 'first' ? 'th-list' : 'star-of-life'}
            />
          );
        }}
      />
    );
  };
  return (
    <TabView
      navigationState={{index, routes}}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{width: layout.width}}
      renderTabBar={renderTabBar}
    />
  );
};

export default NoteList;
