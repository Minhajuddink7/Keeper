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
import Quotes from './Quotes/Quotes';
import TextBox from '../../Components/Inputs/TextBox';
import BottomActions from '../../Components/BottomActions/BottomActions';
import FullPage from '../../Components/Layouts/FullPage';
import Todos from './Quotes/Todos';
import {changeTodos} from '../../Data/redux/actions/checkerActions';
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
  const [index, setIndex] = useState(0);
  const [todo, setTodo] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [viewedNote, setViewedNote] = useState({title: '', body: ''});
  const [selectedNote, setSelectedNote] = useState({id: ''});
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

  const save = () => {
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
        <ScrollView
          style={{
            backgroundColor: BLACK_COLOR,
            paddingTop: 15,
          }}></ScrollView>
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
              value={index === 0 ? todos : null}
              onChangeText={text => {
                if (index === 0) {
                  setTodo(text);
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
                  name: 'play',
                  onPress: function () {
                    navigation.goBack();
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
});
