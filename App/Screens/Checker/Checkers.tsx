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
  changeQuotes,
  changeTodos,
} from '../../Data/redux/actions/checkerActions';
import Affirmations from './Affirmations';
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
  const [viewedNote, setViewedNote] = useState({title: '', body: ''});
  const [selectedNote, setSelectedNote] = useState({id: ''});
  const [affirmationMode, setAffirmationMode] = useState(false);
  const [affirmationIndex, setAffirmationIndex] = useState(0);
  const placeholder =
    index === 0
      ? 'Enter your todo!'
      : index === 1
      ? 'Enter a new Affirmation!'
      : 'Enter a new Quote!';

  const [addModalOpen, setAddModalOpen] = useState(false);
  const [routes] = React.useState([
    {key: 'first', title: 'Todos'},
    {key: 'second', title: 'Affirmations'},
    {key: 'third', title: 'Quotes'},
  ]);

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
      case 2:
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
                text={affirmations[affirmationIndex].affirmation}
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
        <Quotes />
      </View>
    );
  };
  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
    third: ThirdRoute,
  });

  const addNew = () => {
    setAddModalOpen(true);
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
      <TabView
        navigationState={{index, routes}}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{width: layout.width}}
        renderTabBar={renderTabBar}
      />

      {/* <BackButton navigation={navigation} color={CHECKER_SECTION_COLOR} /> */}

      {/* <TouchableOpacity
        style={{
          height: 50,
          width: 50,
          borderRadius: 50,
          position: 'absolute',
          right: 30,
          bottom: 30,
          backgroundColor: NOTES_SECTION_COLOR,
          alignItems: 'center',
          justifyContent: 'center',
        }}
        onPress={addNew}>
        <DynamicIcon family="Entypo" name="plus" size={18} />
      </TouchableOpacity> */}

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
                  name: 'back',
                  onPress: function () {
                    navigation.goBack();
                  },
                },
                {
                  name: affirmationMode ? 'lists' : 'play',
                  onPress: function () {
                    setAffirmationMode(!affirmationMode);
                  },
                },
                {
                  name: 'add',
                  onPress: addNew,
                },
              ]
            : [
                {
                  name: 'back',
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
    </FullPage>
  );
};

export default Checkers;
const styles = StyleSheet.create({
  modalAddRoom: {
    borderWidth: 0.5,
    borderColor: commonData.colors.CHECKER_SECTION_COLOR,
    maxHeight: '70%',
    backgroundColor: '#000',
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
});
