import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';
import React, {useState} from 'react';
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
//   import NoteCard from '../components/Note-List/NoteCard';
const NoteList = ({navigation}) => {
  const dispatch = useDispatch();
  const {BLACK_COLOR, DARK_THEME_COLOR, FINANCE_SECTION_COLOR} =
    commonData.colors;
  const layout = useWindowDimensions();
  const [index, setIndex] = React.useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [viewedNote, setViewedNote] = useState('');
  const [selectedNote, setSelectedNote] = useState({id: ''});
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [routes] = React.useState([
    {key: 'first', title: 'All Notes'},
    {key: 'second', title: 'Stared'},
  ]);

  const FirstRoute = () => {
    // const notes=useSelector(state=>state.notes.)
    const notes: any = useSelector<RootStateOrAny>(state => state.notes.notes);
    return (
      <View style={{flex: 1}}>
        <ScrollView
          style={{
            backgroundColor: BLACK_COLOR,
            paddingTop: 15,
          }}>
          {notes?.length === 0 ? (
            <NoItem text="No Notes Found!" color={FINANCE_SECTION_COLOR} />
          ) : (
            notes.map((note: any) => {
              return (
                <NoteCard
                  key={note.id}
                  note={note}
                  onView={() => {
                    setViewedNote(note.body);
                    setModalOpen(true);
                  }}
                  onDelete={() => {
                    setDeleteModalOpen(true);
                    setSelectedNote(note);
                  }}
                />
              );
            })
          )}
        </ScrollView>
      </View>
    );
  };
  const SecondRoute = () => {
    const notes: any = useSelector<RootStateOrAny>(state => state.notes.notes);
    return (
      <View style={{flex: 1}}>
        <ScrollView
          style={{
            backgroundColor: BLACK_COLOR,
            paddingTop: 15,
          }}>
          {notes?.length === 0 ? (
            <NoItem text="No Notes Found!" color={FINANCE_SECTION_COLOR} />
          ) : (
            notes.map((note: any) => {
              return (
                <NoteCard
                  key={note.id}
                  note={note}
                  onView={() => {
                    setViewedNote(note.body);
                    setModalOpen(true);
                  }}
                  onDelete={() => {
                    setDeleteModalOpen(true);
                    setSelectedNote(note);
                  }}
                />
              );
            })
          )}
        </ScrollView>
      </View>
    );
  };
  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
  });

  // console.log(moment(Date.now()).format('DD-MM-YY'));

  const renderTabBar = props => {
    return (
      <TabBar
        {...props}
        indicatorStyle={{backgroundColor: 'white'}}
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
      />
    );
  };
  return (
    <>
      <TabView
        navigationState={{index, routes}}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{width: layout.width}}
        renderTabBar={renderTabBar}
      />
      <BackButton onPress={() => navigation.goBack()} />
      <BottomModal
        modalOpen={deleteModalOpen}
        setModalOpen={setDeleteModalOpen}>
        <View style={[styles.modalAddRoom]}>
          <Gap />
          <Container>
            <AppText text="Confirm Delete?" type="Montserrat-Bold,#000,18" />
            <Gap />
            <HStack justifyContent="space-between">
              <View style={{flex: 0.47}}>
                <ActionButton
                  text="Delete"
                  action="delete"
                  onPress={() => {
                    dispatch(deleteNote(selectedNote?.id));
                    setDeleteModalOpen(false);
                    showToast('Note Deleted!');
                  }}
                />
              </View>
              <View style={{flex: 0.47}}>
                <ActionButton
                  text="Cancel"
                  action="cancel"
                  onPress={() => {
                    setDeleteModalOpen(false);
                  }}
                />
              </View>
            </HStack>
          </Container>
        </View>
      </BottomModal>
      <NormalModal visible={modalOpen} setVisible={setModalOpen}>
        {/* <Text style={{color: '#000'}}> {viewedNote}</Text> */}
        <ScrollView>
          <View style={{padding: 10}}>
            <AppText
              text={viewedNote}
              type="Montserrat-SemiBold,#000,20"
              ta="justify"
            />
          </View>
        </ScrollView>
        <TouchableOpacity
          style={{
            position: 'absolute',
            bottom: 15,
            right: 15,
            backgroundColor: commonData.colors.NOTES_SECTION_COLOR,
            // padding: 20,
            height: 50,
            width: 50,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 50,
          }}
          onPress={() => {
            setModalOpen(false);
            navigation.navigate('NoteView');
          }}>
          <DynamicIcon
            family="FontAwesome5"
            name="expand"
            size={20}
            // color={}
          />
        </TouchableOpacity>
      </NormalModal>
    </>
  );
};

export default NoteList;
const styles = StyleSheet.create({
  modalAddRoom: {
    maxHeight: '70%',
    backgroundColor: '#ccc',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingBottom: 30,
  },
});
