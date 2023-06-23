import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import moment from 'moment';
//   import DynamicIcon from '../components/Common/DynamicIcon';
// import HStack from '../components/Layouts/Hstack';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import DynamicIcon from '../../Components/Common/DynamicIcon';
import NoteCard from '../../Components/Note-List/NoteCard';
import {RootStateOrAny, useDispatch, useSelector} from 'react-redux';
import NormalModal from '../../Components/Common/modals/NormalModal';
import AppText from '../../Components/Typography/AppText';
import Gap from '../../Components/Common/Gap';
import {commonData} from '../../Data/static/commonData';
import {deleteNote} from '../../Data/redux/actions/notesActions';
import BottomModal from '../../Components/Common/modals/BottomModal';
import Container from '../../Components/Layouts/Container';
import HStack from '../../Components/Layouts/HStack';
import ActionButton from '../../Components/Buttons/ActionButton';
import {showToast} from '../../Helpers/utils';
import NoItem from '../../Components/Common/NoItem';
import HomeButton from '../../Components/Buttons/HomeButton';
import BackButton from '../../Components/Buttons/BackButton';
import BottomActions from '../../Components/BottomActions/BottomActions';
import FullPage from '../../Components/Layouts/FullPage';
import {MenuDivider} from 'react-native-material-menu';
import Divider from '../../Components/Common/Divider';
import {useFocusEffect} from '@react-navigation/native';
import FirstRoute from './FirstRoute';
// import FirstRoute from './FirstRoute';
//   import NoteCard from '../components/Note-List/NoteCard';
const NoteList = ({navigation}) => {
  const dispatch = useDispatch();
  const {
    BLACK_COLOR,
    DARK_THEME_COLOR,
    FINANCE_SECTION_COLOR,
    NOTES_SECTION_COLOR,
  } = commonData.colors;
  const layout = useWindowDimensions();
  const [index, setIndex] = React.useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [viewedNote, setViewedNote] = useState({title: '', body: ''});
  const [selectedNote, setSelectedNote] = useState({id: ''});
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [labelModalOpen, setLabelModalOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState('All Notes');
  useFocusEffect(
    useCallback(() => {
      setFilteredNotes(notes);
    }, []),
  );
  const [routes, setRoutes] = React.useState([
    {key: 'first', title: activeFilter},
    {key: 'second', title: 'Stared'},
  ]);

  useEffect(() => {
    setRoutes([
      {key: 'first', title: activeFilter},
      {key: 'second', title: 'Stared'},
    ]);
  }, [activeFilter]);

  const labels: any = useSelector<RootStateOrAny>(state => state.notes.labels);
  const notes: any = useSelector<RootStateOrAny>(state => state.notes.notes);
  const [filteredNotes, setFilteredNotes] = useState(notes);
  function firstRoute() {
    return (
      <FirstRoute
        navigation={navigation}
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
      />
    );
  }

  const SecondRoute = () => {
    const notes: any = useSelector<RootStateOrAny>(state => state.notes.notes);
    const staredNotes = notes.filter(note => note.isStared);
    return (
      <View style={{flex: 1}}>
        <ScrollView
          style={{
            backgroundColor: BLACK_COLOR,
            paddingTop: 7,
          }}>
          <View style={{paddingBottom: 15}}>
            {staredNotes?.length === 0 ? (
              <NoItem
                text="No Stared Notes Found!"
                color={FINANCE_SECTION_COLOR}
              />
            ) : (
              staredNotes.map((note: any) => {
                return (
                  <NoteCard
                    key={note.id}
                    note={note}
                    onPeek={() => {
                      setViewedNote(note);
                      setModalOpen(true);
                    }}
                    onDelete={() => {
                      setDeleteModalOpen(true);
                      setSelectedNote(note);
                    }}
                    onEdit={() => navigation.navigate('EditNote', {note})}
                    onSelect={() => {
                      navigation.navigate('NoteView', {viewedNote: note});
                    }}
                  />
                );
              })
            )}
          </View>
        </ScrollView>
        <BottomActions
          actions={[
            {
              name: 'write',
              onPress: function () {
                navigation.navigate('TakeNotes');
              },
            },

            {
              name: 'home',
              onPress: function () {
                navigation.navigate('Home');
              },
            },
          ]}
        />
      </View>
    );
  };

  const FilterItem = ({text, onPress}) => {
    return (
      <TouchableOpacity onPress={onPress}>
        <AppText text={text} type="Kalam-Regular,,18" ta="center" />
        <MenuDivider />
      </TouchableOpacity>
    );
  };
  const renderScene = SceneMap({
    first: firstRoute,
    second: SecondRoute,
  });

  const renderTabBar = props => {
    return (
      <TabBar
        {...props}
        indicatorStyle={{backgroundColor: NOTES_SECTION_COLOR}}
        style={{backgroundColor: DARK_THEME_COLOR}}
        renderIcon={({route, focused, color}) => {
          return (
            <DynamicIcon
              color={color}
              family="FontAwesome"
              name={route.key === 'first' ? 'th-list' : 'star'}
            />
          );
        }}
        renderLabel={({route, focused, color}) => (
          <Text style={{color, fontSize: 18, fontFamily: 'Kalam-Bold'}}>
            {route.title}
          </Text>
        )}
      />
    );
  };

  const filterNotes = (label: string) => {
    const notesCopy = [...notes];
    const updatedList = notesCopy.filter(note => note.label === label);
    if (label === '') {
      setFilteredNotes(notesCopy);
      setActiveFilter('All Notes');
    } else {
      setFilteredNotes(updatedList);
      setActiveFilter(label);
    }
    setLabelModalOpen(false);
  };
  return (
    <FullPage color={commonData.colors.BLACK_COLOR}>
      <TabView
        navigationState={{index, routes}}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{width: layout.width}}
        renderTabBar={renderTabBar}
      />
    </FullPage>
  );
};

export default NoteList;
const styles = StyleSheet.create({
  modalAddRoom: {
    maxHeight: '70%',
    backgroundColor: '#000',
    borderWidth: 0.5,
    borderColor: commonData.colors.NOTES_SECTION_COLOR,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingBottom: 30,
  },
});
