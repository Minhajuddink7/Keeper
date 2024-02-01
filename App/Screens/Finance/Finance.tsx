import {StyleSheet, Text, useWindowDimensions, View} from 'react-native';
import React, {useState} from 'react';
import FullPage from '../../Components/Layouts/FullPage';
import BottomActions from '../../Components/BottomActions/BottomActions';
import {commonData} from '../../Data/static/commonData';
import {SceneMap, TabBar, TabView} from 'react-native-tab-view';
import Stocks from './Stocks';
import BottomModal from '../../Components/Common/modals/BottomModal';
import Gap from '../../Components/Common/Gap';
import {ScrollView, TextInput} from 'react-native-gesture-handler';
import ActionButton from '../../Components/Buttons/ActionButton';
import HStack from '../../Components/Layouts/HStack';
import {showToast} from '../../Helpers/utils';
import {RootStateOrAny, useDispatch, useSelector} from 'react-redux';
import {changeStockList} from '../../Data/redux/actions/financeAction';

const Finance = ({navigation}) => {
  const [index, setIndex] = useState(0);
  const layout = useWindowDimensions();
  const {DARK_THEME_COLOR, FINANCE_SECTION_COLOR} = commonData.colors;
  const [routes] = React.useState([
    {key: 'first', title: 'Stocks'},
    {key: 'second', title: 'Transactions'},
  ]);

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
  const FirstRoute = () => {
    return <Stocks />;
  };
  const SecondRoute = () => {
    return <View></View>;
  };
  // const ThirdRoute = () => {
  //   return <View></View>;
  // };

  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
    // third: ThirdRoute,
    // fourth: ThirdRoute,
  });

  function addNew() {
    setListModalOpen(true);
  }

  const renderTabBar = props => {
    return (
      <TabBar
        {...props}
        indicatorStyle={{backgroundColor: FINANCE_SECTION_COLOR}}
        style={{backgroundColor: DARK_THEME_COLOR}}
        renderLabel={({route, focused, color}) => (
          <Text style={{color, fontSize: 18, fontFamily: 'Kalam-Bold'}}>
            {route.title}
          </Text>
        )}
      />
    );
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
          {
            name: 'add',
            onPress: addNew,
          },
          // {},
        ]}
      />
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
    </FullPage>
  );
};

export default Finance;

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
