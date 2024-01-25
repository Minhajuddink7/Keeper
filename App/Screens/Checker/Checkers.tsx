import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
  TextInput,
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
import Quotes from './Quotes';
import TextBox from '../../Components/Inputs/TextBox';
import BottomActions from '../../Components/BottomActions/BottomActions';
import FullPage from '../../Components/Layouts/FullPage';
import Todos from './Todos';
import {
  changeAffirmations,
  changeList,
  changeQuotes,
  changeTodos,
} from '../../Data/redux/actions/checkerActions';
import Affirmations from './Affirmations';
import Lists from './Lists';
// import RecycleTestComponent from '../../Components/Common/DraggableList';
//   import NoteCard from '../components/Note-List/NoteCard';
const Checkers = ({navigation}) => {
  const dispatch = useDispatch();
  const {
    BLACK_COLOR,
    DARK_THEME_COLOR,
    CHECKER_SECTION_COLOR,
    NOTES_SECTION_COLOR,
  } = commonData.colors;
  const layout = useWindowDimensions();
  const todos: any = useSelector<RootStateOrAny>(state => state.checker.todos);
  const quotes: any = useSelector<RootStateOrAny>(
    state => state.checker.quotes,
  );
  const affirmations: any = useSelector<RootStateOrAny>(
    state => state.checker.affirmations,
  );

  const [index, setIndex] = useState(0);
  const [todo, setTodo] = useState('');
  const [affirmation, setAffirmation] = useState('');
  const [quote, setQuote] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [listModalOpen, setListModalOpen] = useState(false);
  const [viewedNote, setViewedNote] = useState({title: '', body: ''});
  const [selectedNote, setSelectedNote] = useState({id: ''});
  const [affirmationMode, setAffirmationMode] = useState(false);
  const [affirmationIndex, setAffirmationIndex] = useState(0);

  const [isUpdateMode, setIsUpdateMode] = useState(false);
  const [header, setHeader] = useState('');
  const [body, setBody] = useState('');
  const placeholder =
    index === 0
      ? 'Enter your todo!'
      : index === 1
      ? 'Enter a new Affirmation!'
      : 'Enter a new Quote!';

  const [addModalOpen, setAddModalOpen] = useState(false);
  const [routes] = React.useState([
    {key: 'first', title: 'Todos'},
    {key: 'second', title: 'Affirm'},
    {key: 'third', title: 'Lists'},
    {key: 'fourth', title: 'Quotes'},
  ]);
  const lists: any = useSelector<RootStateOrAny>(state => state.checker.lists);

  const [selectedList, setSelectedList] = useState({
    id: '',
    header: '',
    body: '',
  });

  const addTodo = () => {
    if (!todo) {
      showToast('Please enter your todo!');
      return;
    }
    const newTodo = {
      id: Date.now(),
      title: todo,
      isCompleted: false,
    };
    const newTodos = [...todos, newTodo];
    dispatch(changeTodos(newTodos));
    showToast('Todo Added!');
    setTodo('');
  };
  const addAffirmation = () => {
    if (!affirmation) {
      showToast('Please enter a new affirmation!');
      return;
    }
    const newAffirmation = {id: Date.now(), affirmation};
    const newAffirmations = [...affirmations, newAffirmation];
    dispatch(changeAffirmations(newAffirmations));
    showToast('Affirmation Added');
    setAffirmation('');
  };
  const addQuote = () => {
    if (!quote) {
      showToast('Please enter a quote!');
      return;
    }
    const newQuote = {id: Date.now(), quote};
    const newQuotes = [...quotes, newQuote];
    dispatch(changeQuotes(newQuotes));
    showToast('Quote Added');
    setQuote('');
  };
  const save = () => {
    switch (index) {
      case 0:
        addTodo();
        break;
      case 1:
        addAffirmation();
        break;
      case 3:
        addQuote();
        break;

      default:
        break;
    }
    return;
  };
  const FirstRoute = () => {
    return (
      <View style={{flex: 1}}>
        <Todos />
      </View>
    );
  };

  const SecondRoute = () => {
    return (
      <View style={{flex: 1}}>
        {affirmationMode ? (
          <>
            <View
              style={{
                // backgroundColor: 'red',
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <AppText
                text={affirmations?.[affirmationIndex]?.affirmation}
                type={`${commonData.fonts.BOLD},#fff,25`}
                ml={10}
                mr={10}
                ta="center"
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                // backgroundColor: 'red',
                alignItems: 'center',
                justifyContent: 'center',
                // marginTop: 'auto',
              }}>
              <TouchableOpacity
                style={{
                  ...styles.actionButton,
                  borderTopLeftRadius: 25,
                  borderBottomLeftRadius: 25,
                  borderTopRightRadius: 10,
                  borderBottomRightRadius: 10,
                  marginRight: 15,
                }}
                onPress={() => {
                  if (affirmationIndex < affirmations?.length - 1)
                    setAffirmationIndex(affirmationIndex - 1);
                  else {
                    setAffirmationIndex(0);
                    showToast('You completed one cycle');
                  }
                }}>
                <DynamicIcon
                  family="FontAwesome"
                  name="chevron-left"
                  color="#bbb"
                />
                {/* <AppText text="Next" type=",#ccc,16" /> */}
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.actionButton}
                onPress={() => {
                  if (affirmationIndex < affirmations?.length - 1)
                    setAffirmationIndex(affirmationIndex + 1);
                  else {
                    setAffirmationIndex(0);
                    showToast('You completed your cycle');
                  }
                }}>
                <DynamicIcon
                  family="FontAwesome"
                  name="chevron-right"
                  color="#bbb"
                />
                {/* <AppText text="Next" type=",#ccc,16" /> */}
              </TouchableOpacity>
            </View>
          </>
        ) : (
          <Affirmations />
        )}
      </View>
    );
  };
  const ThirdRoute = () => {
    return (
      <View style={{flex: 1, backgroundColor: BLACK_COLOR}}>
        <Lists />
      </View>
    );
  };
  const FourthRoute = () => {
    return (
      <View style={{flex: 1, backgroundColor: BLACK_COLOR}}>
        <Quotes />
      </View>
    );
  };
  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
    third: ThirdRoute,
    fourth: FourthRoute,
  });

  const addNew = () => {
    if (index === 2) {
      console.log('sdfsdf');
      setListModalOpen(true);
    } else setAddModalOpen(true);
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
      // const newList = {id: Date.now(), header, body};
      // const newLists = [...lists, newList];
      // dispatch(changeList(newLists));
      showToast('List Updated');
      setHeader('');
      setBody('');
      setListModalOpen(false);
    }
    console.log('sdfsdf', selectedList?.id);
  };
  const renderTabBar = props => {
    return (
      <TabBar
        {...props}
        indicatorStyle={{backgroundColor: CHECKER_SECTION_COLOR}}
        style={{backgroundColor: DARK_THEME_COLOR}}
        renderLabel={({route, focused, color}) => (
          <Text style={{color, fontSize: 18, fontFamily: 'Kalam-Bold'}}>
            {route.title}
          </Text>
        )}
      />
    );
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

      <BottomModal modalOpen={addModalOpen} setModalOpen={setAddModalOpen}>
        <View style={[styles.modalAddRoom]}>
          <Gap />
          <Container>
            {/* <TextBox placeholder="Enter your quote" /> */}
            <TextInput
              multiline={true}
              placeholder={placeholder}
              placeholderTextColor="#777"
              value={index === 0 ? todo : index === 1 ? affirmation : quote}
              onChangeText={text => {
                if (index === 0) {
                  setTodo(text);
                } else if (index === 1) {
                  setAffirmation(text);
                } else {
                  setQuote(text);
                }
              }}
              style={{
                borderWidth: 1,
                borderRadius: 8,
                paddingLeft: 10,
                backgroundColor: DARK_THEME_COLOR,
                fontFamily: 'Kalam-Regular',
                fontSize: 20,
                color: '#ddd',
              }}
              autoFocus={true}
              // numberOfLines={2}
            />
            {/* <AppText text="Confirm Delete?" type="Kalam-Bold,#000,18" /> */}
            <Gap />
            <HStack justifyContent="space-between">
              <View style={{flex: 0.47}}>
                <ActionButton
                  text="Cancel"
                  action="cancel"
                  onPress={() => {
                    setAddModalOpen(false);
                  }}
                />
              </View>
              <View style={{flex: 0.47}}>
                <ActionButton
                  text="Save"
                  action="save"
                  onPress={() => {
                    save();
                    setAddModalOpen(false);
                  }}
                />
              </View>
            </HStack>
          </Container>
        </View>
      </BottomModal>

      <BottomActions
        actions={
          index === 1
            ? [
                {
                  name: 'home',
                  onPress: function () {
                    navigation.goBack();
                  },
                },
                {
                  name: affirmationMode ? 'lists' : 'play',
                  onPress: function () {
                    if (affirmations.length > 0)
                      setAffirmationMode(!affirmationMode);
                    else showToast('Add affirmations to read!');
                  },
                },
                {
                  name: 'add',
                  onPress: addNew,
                },
              ]
            : [
                {
                  name: 'home',
                  onPress: function () {
                    navigation.goBack();
                  },
                },

                {
                  name: 'add',
                  onPress: addNew,
                },
              ]
        }
      />
      <NormalModal visible={modalOpen} setVisible={setModalOpen}>
        {/* <Text style={{color: '#000'}}> {viewedNote}</Text> */}
        <ScrollView>
          <View style={{padding: 10}}>
            <AppText
              text={viewedNote?.body}
              type="Kalam-Regular,#000,20"
              ta="justify"
            />
          </View>
        </ScrollView>
      </NormalModal>

      <BottomModal modalOpen={listModalOpen} setModalOpen={setListModalOpen}>
        <View style={[styles.modal]}>
          <Gap gap={5} />
          {/* <Container> */}
          {/* <TextBox placeholder="Enter your quote" /> */}

          {/* <View style={{margin: 10, backgroundColor: 'red', height: '100%'}}> */}
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
              // onKeyPress={handleKeyPress}
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
          {/* </View> */}

          {/* </Container> */}
        </View>
      </BottomModal>
    </FullPage>
  );
};

export default Checkers;
const styles = StyleSheet.create({
  modalAddRoom: {
    borderWidth: 0.2,
    borderColor: commonData.colors.CHECKER_SECTION_COLOR,
    maxHeight: '70%',
    backgroundColor: '#222',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingBottom: 30,
  },
  actionButton: {
    // width: '36%',
    backgroundColor: commonData.colors.CHECKER_SECTION_COLOR,
    borderTopRightRadius: 50,
    borderBottomRightRadius: 50,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    height: 45,
    width: 75,
    alignItems: 'center',
    justifyContent: 'center',
    // marginTop: 'auto',
    // alignSelf: 'center',
    marginBottom: 15,
  },
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
