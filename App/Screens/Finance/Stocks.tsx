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
// import commonStyles from './commonStyles';
import Gap from '../../Components/Common/Gap';
import AppText from '../../Components/Typography/AppText';
import DynamicIcon from '../../Components/Common/DynamicIcon';
import HStack from '../../Components/Layouts/HStack';
import BottomModal from '../../Components/Common/modals/BottomModal';
import {commonData} from '../../Data/static/commonData';
import ActionButton from '../../Components/Buttons/ActionButton';
// import AddButton from './AddButton';
import {RootStateOrAny, useDispatch, useSelector} from 'react-redux';
import NoItem from '../../Components/Common/NoItem';
import {showToast} from '../../Helpers/utils';

import commonStyles from '../Checker/commonStyles';

import {
  changeStockList,
  deleteStockList,
} from '../../Data/redux/actions/financeAction';

const {
  DARK_THEME_COLOR,
  // CHECKER_SECTION_COLOR,
  FINANCE_SECTION_COLOR,
} = commonData.colors;
const Stocks = () => {
  const dispatch = useDispatch();
  const stocksList: any = useSelector<RootStateOrAny>(
    state => state.finance.stocksList,
  );
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
    dispatch(deleteStockList(id));
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
      const newLists = [newList, ...stocksList];
      console.log('New Lists: ', JSON.stringify(newLists));
      dispatch(changeStockList(newLists));
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
      const newLists = [...stocksList];
      const selectedItem = [...stocksList].find(
        list => list.id === selectedList?.id,
      );
      selectedItem.header = header;
      selectedItem.body = body;
      const updatedLists = newLists.map(list => {
        if (list.id === selectedList?.id) {
          return selectedItem;
        } else return list;
      });
      dispatch(changeStockList(updatedLists));

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
        {stocksList?.length > 0 ? (
          <FlatList
            data={stocksList}
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
          <NoItem color={FINANCE_SECTION_COLOR} text="No lists found!" />
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
                  source="finance"
                  text="Cancel"
                  action="cancel"
                  onPress={() => {
                    setListModalOpen(false);
                  }}
                />
              </View>
              <View style={{flex: 0.47}}>
                <ActionButton
                  source="finance"
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

export default Stocks;

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
