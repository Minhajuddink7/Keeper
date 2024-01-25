import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import commonStyles from './commonStyles';
import Gap from '../../Components/Common/Gap';
import AppText from '../../Components/Typography/AppText';
import DynamicIcon from '../../Components/Common/DynamicIcon';
import HStack from '../../Components/Layouts/HStack';
import BottomModal from '../../Components/Common/modals/BottomModal';
import {commonData} from '../../Data/static/commonData';
import ActionButton from '../../Components/Buttons/ActionButton';
import AddButton from './AddButton';
import {RootStateOrAny, useDispatch, useSelector} from 'react-redux';
import NoItem from '../../Components/Common/NoItem';
import {showToast} from '../../Helpers/utils';
import {changeList, deleteList} from '../../Data/redux/actions/checkerActions';

const {
  BLACK_COLOR,
  DARK_THEME_COLOR,
  CHECKER_SECTION_COLOR,
  NOTES_SECTION_COLOR,
} = commonData.colors;
const Lists = () => {
  const dispatch = useDispatch();
  const lists: any = useSelector<RootStateOrAny>(state => state.checker.lists);
  const [listModalOpen, setListModalOpen] = useState(false);
  const [selectedList, setSelectedList] = useState({
    id: '',
    header: '',
    body: '',
  });
  const [isUpdateMode, setIsUpdateMode] = useState(false);
  const [header, setHeader] = useState('');
  const [body, setBody] = useState('');

  const deleteSingleList = id => {
    dispatch(deleteList(id));
  };

  const addList = () => {
    if (!header) {
      showToast('Please enter a header!');
      return;
    } else if (!body) {
      showToast('Please enter list items!');
      return;
    } else {
      const newList = {id: Date.now(), header, body};
      const newLists = [...lists, newList];
      dispatch(changeList(newLists));
      showToast('List Added');
      setHeader('');
      setBody('');
      setListModalOpen(false);
    }
  };

  const updateList = () => {
    if (!header) {
      showToast('Please enter a header!');
      return;
    } else if (!body) {
      showToast('Please enter list items!');
      return;
    } else {
      // const OldList = {id: selectedList?.id, header, body};
      const newLists = [...lists];
      const selectedItem = [...lists].find(
        list => list.id === selectedList?.id,
      );
      selectedItem.header = header;
      selectedItem.body = body;
      const updatedLists = newLists.map(list => {
        if (list.id === selectedList?.id) {
          return selectedItem;
        } else return list;
      });
      dispatch(changeList(updatedLists));

      showToast('List Updated');
      setHeader('');
      setBody('');
      setListModalOpen(false);
    }
    console.log('sdfsdf', selectedList?.id);
  };

  return (
    <View style={{flex: 1}}>
      <View>
        <Gap gap={7} />
        {lists?.length > 0 ? (
          <FlatList
            data={lists}
            renderItem={({item}) => {
              return (
                <TouchableOpacity
                  style={{...commonStyles.card}}
                  onPress={() => {
                    setSelectedList(item);
                    setHeader(item.header);
                    setBody(item.body);
                    setIsUpdateMode(true);
                    setListModalOpen(true);
                  }}>
                  <HStack justifyContent="space-between">
                    <AppText text="" />
                    <AppText
                      text={item.header}
                      type="Kalam-Bold,#fff,18"
                      td="underline"
                      //   ta="center"
                    />
                    <TouchableOpacity onPress={() => deleteSingleList(item.id)}>
                      <DynamicIcon
                        color="#ccc"
                        family="FontAwesome5"
                        name="trash"
                        size={16}
                      />
                    </TouchableOpacity>
                  </HStack>
                  <AppText text={item.body} type=",#fff,16" />
                </TouchableOpacity>
              );
            }}
          />
        ) : (
          <NoItem color={CHECKER_SECTION_COLOR} text="No lists found!" />
        )}
        <BottomModal modalOpen={listModalOpen} setModalOpen={setListModalOpen}>
          <View style={[styles.modal]}>
            <Gap gap={5} />

            <TextInput
              placeholder={'Enter the list title!'}
              placeholderTextColor="#777"
              value={header}
              onChangeText={text => {
                setHeader(text);
              }}
              style={{
                borderWidth: 1,
                borderTopLeftRadius: 8,
                borderTopRightRadius: 8,
                paddingLeft: 10,
                backgroundColor: DARK_THEME_COLOR,
                fontFamily: 'Kalam-Bold',
                fontSize: 22,
                color: '#ddd',
              }}
              autoFocus={true}
              // numberOfLines={2}
            />
            <ScrollView>
              <TextInput
                multiline={true}
                placeholder={'Add List Items'}
                placeholderTextColor="#777"
                value={body}
                onChangeText={text => {
                  setBody(text);
                }}
                style={{
                  borderWidth: 1,
                  borderBottomLeftRadius: 8,
                  borderBottomRightRadius: 8,
                  paddingLeft: 10,
                  backgroundColor: DARK_THEME_COLOR,
                  fontFamily: 'Kalam-Regular',
                  fontSize: 20,
                  color: '#ddd',
                  height: 'auto',
                }}
                autoFocus={true}
                // numberOfLines={3}
              />
            </ScrollView>
            <Gap />
            <HStack justifyContent="space-between">
              <View style={{flex: 0.47}}>
                <ActionButton
                  text="Cancel"
                  action="cancel"
                  onPress={() => {
                    setListModalOpen(false);
                  }}
                />
              </View>
              <View style={{flex: 0.47}}>
                <ActionButton
                  text={isUpdateMode ? 'Update' : 'Save'}
                  action="save"
                  onPress={() => {
                    {
                      isUpdateMode ? updateList() : addList();
                    }
                  }}
                />
              </View>
            </HStack>
          </View>
        </BottomModal>
      </View>
    </View>
  );
};

export default Lists;

const styles = StyleSheet.create({
  modal: {
    borderWidth: 0.2,
    borderColor: commonData.colors.CHECKER_SECTION_COLOR,
    maxHeight: '70%',
    backgroundColor: '#222',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    // paddingBottom: 30,
    padding: 10,
  },
});
