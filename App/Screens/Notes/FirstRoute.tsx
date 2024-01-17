import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import NoItem from '../../Components/Common/NoItem';
import NoteCard from '../../Components/Note-List/NoteCard';
import {commonData} from '../../Data/static/commonData';
import BottomModal from '../../Components/Common/modals/BottomModal';
import Gap from '../../Components/Common/Gap';
import Container from '../../Components/Layouts/Container';
import AppText from '../../Components/Typography/AppText';
import HStack from '../../Components/Layouts/HStack';
import ActionButton from '../../Components/Buttons/ActionButton';
import {showToast} from '../../Helpers/utils';
import {deleteNote} from '../../Data/redux/actions/notesActions';
import NormalModal from '../../Components/Common/modals/NormalModal';
import {MenuDivider} from 'react-native-material-menu';
import {RootStateOrAny, useDispatch, useSelector} from 'react-redux';
import BottomActions from '../../Components/BottomActions/BottomActions';

const {BLACK_COLOR, FINANCE_SECTION_COLOR, NOTES_SECTION_COLOR} =
  commonData.colors;
const FilterItem = ({text, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Gap gap={7} />
      <AppText text={text} type="Kalam-Regular,#fff,18" ta="center" />
      <Gap gap={7} />
      <MenuDivider color={NOTES_SECTION_COLOR} />
    </TouchableOpacity>
  );
};
const FirstRoute = ({navigation, activeFilter, setActiveFilter}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [viewedNote, setViewedNote] = useState({title: '', body: ''});
  const [selectedNote, setSelectedNote] = useState({id: ''});
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [labelModalOpen, setLabelModalOpen] = useState(false);
  const labels: any = useSelector<RootStateOrAny>(state => state.notes.labels);

  const notes: any = useSelector<RootStateOrAny>(state => state.notes.notes);
  const [filteredNotes, setFilteredNotes] = useState(notes);
  //   const [selectedFilter, setSelectedFilter] = useState();
  //   const [activeFilter, setActiveFilter] = useState('All Notes');

  const dispatch = useDispatch();
  const filterNotes = (label: string) => {
    const notesCopy = [...notes];
    const updatedList = notesCopy.filter(note => note.label === label);
    if (label === 'All Notes') {
      setFilteredNotes(notesCopy);
      //   setActiveFilter('All Notes');
    } else {
      setFilteredNotes(updatedList);
      //   setActiveFilter(label);
    }
    setLabelModalOpen(false);
  };

  useEffect(() => {
    filterNotes(activeFilter);
  }, [activeFilter]);

  // useEffect(() => {
  //   setActiveFilter('All Notes');
  //   // console.log('ssss');
  // }, []);
  return (
    <View style={{flex: 1}}>
      <View
        style={{
          backgroundColor: BLACK_COLOR,
          paddingTop: 7,
          paddingBottom: 70,
          // flex: 1,
          // height: '95%',
        }}>
        {/* <View style={{paddingBottom: 70}}> */}
        {filteredNotes?.length === 0 ? (
          <NoItem text="No Notes Found!" color={FINANCE_SECTION_COLOR} />
        ) : (
          <FlatList
            data={filteredNotes}
            renderItem={({item}) => {
              return (
                <NoteCard
                  // key={note.id}
                  onEdit={() => navigation.navigate('EditNote', {note: item})}
                  note={item}
                  onPeek={() => {
                    setViewedNote(item);
                    setModalOpen(true);
                  }}
                  onDelete={() => {
                    setDeleteModalOpen(true);
                    setSelectedNote(item);
                  }}
                  onSelect={() => {
                    navigation.navigate('NoteView', {viewedNote: item});
                  }}
                />
              );
            }}
          />
        )}
        {/* </View> */}
      </View>
      <BottomModal
        modalOpen={deleteModalOpen}
        setModalOpen={setDeleteModalOpen}>
        <View style={[styles.modal]}>
          <Gap gap={5} />
          {/* <Container> */}
          <AppText text="Confirm Delete?" type="Kalam-Bold,#ccc,18" />
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
          {/* </Container> */}
        </View>
      </BottomModal>
      <NormalModal
        flex={0.8}
        visible={labelModalOpen}
        setVisible={setLabelModalOpen}>
        {/* <Gap /> */}
        <View
          style={{
            borderWidth: 0.2,
            borderColor: NOTES_SECTION_COLOR,
            maxHeight: '70%',
            backgroundColor: '#222',
            borderRadius: 6,
            // flex: 0,
          }}>
          <Gap />
          <AppText text="Select Label" type="Kalam-Bold,#fff,24" ta="center" />
          <MenuDivider color={NOTES_SECTION_COLOR} />
          <MenuDivider color={NOTES_SECTION_COLOR} />
          <MenuDivider color={NOTES_SECTION_COLOR} />
          <MenuDivider color={NOTES_SECTION_COLOR} />

          {/* <MenuDivider />
          <MenuDivider /> */}
          <FilterItem
            text={'All Notes'}
            onPress={() => {
              filterNotes('All Notes');
              setActiveFilter('All Notes');
            }}
          />
          <FlatList
            data={labels}
            renderItem={({item}) => {
              return (
                <FilterItem
                  text={item}
                  // key={i}
                  onPress={() => {
                    setActiveFilter(item);
                  }}
                />
              );
            }}
          />
          {/* {labels.map((label: string, i: number) => {
            return (
              <FilterItem
                text={label}
                key={i}
                onPress={() => {
                  setActiveFilter(label);
                }}
              />
            );
          })} */}
        </View>
      </NormalModal>

      <NormalModal visible={modalOpen} setVisible={setModalOpen} flex={0.5}>
        <View style={{flex: 0.7}}>
          <ScrollView>
            <View style={{padding: 10, backgroundColor: '#222', flex: 1}}>
              <AppText
                text={viewedNote?.body}
                type="Kalam-Regular,#fff,20"
                ta="justify"
              />
            </View>
          </ScrollView>
        </View>
      </NormalModal>
      <View style={{marginTop: 'auto'}}>
        <BottomActions
          actions={[
            {
              name: 'write',
              onPress: function () {
                navigation.navigate('TakeNotes');
                // navigation.goBack();
              },
            },
            {
              name: 'filter',
              onPress: function () {
                setLabelModalOpen(true);
                // navigation.navigate('Home');
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
    </View>
  );
};

export default FirstRoute;

const styles = StyleSheet.create({
  modal: {
    // flex: 0.5,
    maxHeight: '70%',
    backgroundColor: commonData.colors.BLACK_COLOR,
    borderWidth: 0.5,
    borderColor: commonData.colors.NOTES_SECTION_COLOR,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    padding: 10,
  },
});
