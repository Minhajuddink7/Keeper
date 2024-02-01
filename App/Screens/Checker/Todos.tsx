import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  FlatList,
} from 'react-native';
import React, {useState} from 'react';
import {commonData} from '../../Data/static/commonData';
import AppText from '../../Components/Typography/AppText';
import DynamicIcon from '../../Components/Common/DynamicIcon';
import HStack from '../../Components/Layouts/HStack';
import {RootStateOrAny, useDispatch, useSelector} from 'react-redux';
import {
  changeTodos,
  deleteTodo,
  toggleTodo,
} from '../../Data/redux/actions/checkerActions';
import NoItem from '../../Components/Common/NoItem';
import commonStyles from './commonStyles';
import BottomModal from '../../Components/Common/modals/BottomModal';
import Gap from '../../Components/Common/Gap';
import Container from '../../Components/Layouts/Container';
import ActionButton from '../../Components/Buttons/ActionButton';
import AddButton from './AddButton';
import {showToast} from '../../Helpers/utils';
// import {FlatList} from 'react-native-gesture-handler';
const {DARK_THEME_COLOR} = commonData.colors;
const Todos = () => {
  const dispatch = useDispatch();
  const todos: any = useSelector<RootStateOrAny>(state => state.checker.todos);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [todo, setTodo] = useState('');
  const deleteTodoItem = id => {
    dispatch(deleteTodo(id));
    // console.log(id);
  };
  const toggleCompletedTodo = id => {
    dispatch(toggleTodo(id));
  };
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
    const newTodos = [newTodo, ...todos];
    dispatch(changeTodos(newTodos));
    showToast('Todo Added!');
    setTodo('');
  };
  return (
    <View style={{flex: 1}}>
      <View
        style={{
          backgroundColor: commonData.colors.BLACK_COLOR,
          paddingTop: 7,
          paddingBottom: 10,
        }}>
        {todos?.length === 0 ? (
          <NoItem
            text="No Todos found!"
            color={commonData.colors.CHECKER_SECTION_COLOR}
          />
        ) : (
          <FlatList
            data={todos}
            renderItem={({item: todo, index}) => {
              return (
                <View style={commonStyles.card}>
                  <HStack alignItems="flex-start">
                    <AppText
                      text={`${index + 1}. `}
                      type={`${commonData.fonts.BOLD},${
                        !todo.isCompleted ? '#fff' : '#aaa'
                      },18`}
                    />
                    <AppText
                      td={todo.isCompleted ? 'line-through' : 'none'}
                      text={todo.title}
                      //   text={`"${quote.name}"`}
                      type={`${commonData.fonts.BOLD},${
                        !todo.isCompleted ? '#fff' : '#aaa'
                      },18`}
                    />
                  </HStack>
                  <HStack justifyContent="flex-end">
                    <TouchableOpacity
                      onPress={() => toggleCompletedTodo(todo.id)}>
                      {todo.isCompleted ? (
                        <DynamicIcon
                          color="#ccc"
                          family="FontAwesome"
                          name="check-square"
                          size={20}
                        />
                      ) : (
                        <DynamicIcon
                          color="#ccc"
                          family="FontAwesome"
                          name="square-o"
                          size={20}
                        />
                      )}
                    </TouchableOpacity>
                    <AppText text="   " />
                    <TouchableOpacity onPress={() => deleteTodoItem(todo.id)}>
                      <DynamicIcon
                        color="#ccc"
                        family="FontAwesome5"
                        name="trash"
                        size={16}
                      />
                    </TouchableOpacity>
                  </HStack>
                </View>
              );
            }}
          />
        )}
      </View>
      <BottomModal modalOpen={addModalOpen} setModalOpen={setAddModalOpen}>
        <View style={commonStyles.addBottomModal}>
          <Gap gap={5} />

          <TextInput
            multiline={true}
            placeholder="Enter Your Todo!"
            placeholderTextColor="#777"
            value={todo}
            onChangeText={text => {
              setTodo(text);
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
                source="checkers"
                text="Cancel"
                action="cancel"
                onPress={() => {
                  setAddModalOpen(false);
                }}
              />
            </View>
            <View style={{flex: 0.47}}>
              <ActionButton
                source="checkers"
                text="Saveddf"
                action="save"
                onPress={() => {
                  addTodo();
                  setAddModalOpen(false);
                }}
              />
            </View>
          </HStack>
          {/* </Container> */}
        </View>
      </BottomModal>
      {/* <AddButton onPress={() => setAddModalOpen(true)} /> */}
    </View>
  );
};

export default Todos;

const styles = StyleSheet.create({});
