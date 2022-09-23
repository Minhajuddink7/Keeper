import {actionType} from '../actions/actionType';
const INITIAL_STATE = {
  todos: [],
  affirmations: [],
  quotes: [],
};

const CheckerReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionType.checkers.setTodos:
      return {...state, todos: action.payload};
    case actionType.checkers.deleteTodo:
      return deleteTodo(state, action.payload);
    case actionType.checkers.toggleTodo:
      return toggleCompleted(state, action.payload);
    default:
      return state;
  }
};
const deleteTodo = (state, payload) => {
  const curTodos = [...state.todos];
  const updatedTodos = curTodos.filter(todo => todo.id !== payload);
  return {...state, todos: updatedTodos};
};

const toggleCompleted = (state, payload) => {
  const id = payload;
  console.log(id);
  const todos = {...state}.todos;
  const updatedTodos = todos.map(todo => {
    const isCompleted = todo.isCompleted;
    if (todo.id === id) {
      return {...todo, isCompleted: !isCompleted};
    } else return todo;
  });
  return {...state, todos: updatedTodos};
};
export default CheckerReducer;
