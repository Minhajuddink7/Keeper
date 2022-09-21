import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {commonData} from '../../../Data/static/commonData';
import AppText from '../../../Components/Typography/AppText';
import DynamicIcon from '../../../Components/Common/DynamicIcon';
import HStack from '../../../Components/Layouts/HStack';
import {RootStateOrAny, useDispatch, useSelector} from 'react-redux';
import {
  deleteTodo,
  toggleTodo,
} from '../../../Data/redux/actions/checkerActions';

const Todos = () => {
  const dispatch = useDispatch();
  const todos: any = useSelector<RootStateOrAny>(state => state.checker.todos);
  console.log(todos);
  const deleteTodoItem = id => {
    dispatch(deleteTodo(id));
    // console.log(id);
  };
  const toggleCompletedTodo = id => {
    dispatch(toggleTodo(id));
  };
  return (
    <ScrollView
      style={{
        backgroundColor: commonData.colors.BLACK_COLOR,
        paddingTop: 15,
      }}>
      {todos?.map((todo, i) => {
        // console.log(todo);
        return (
          <View
            key={i}
            style={{
              padding: 10,
              borderWidth: 0.5,
              margin: 6,
              borderRadius: 6,
              borderColor: commonData.colors.CHECKER_SECTION_COLOR,
            }}>
            <AppText
              td={todo.isCompleted ? 'line-through' : 'none'}
              text={todo.title}
              //   text={`"${quote.name}"`}
              type={`${commonData.fonts.BOLD},#fff,18`}
            />
            <HStack justifyContent="flex-end">
              <TouchableOpacity onPress={() => toggleCompletedTodo(todo.id)}>
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
      })}
    </ScrollView>
  );
};

export default Todos;

const styles = StyleSheet.create({});
