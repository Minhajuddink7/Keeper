import {actionType} from '../actions/actionType';
const INITIAL_STATE = {
  todos: [],
  lists: [],
  affirmations: [],
  quotes: [],
};

const CheckerReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    //todos
    case actionType.checkers.setTodos:
      return {...state, todos: action.payload};
    case actionType.checkers.deleteTodo:
      return deleteTodo(state, action.payload);
    case actionType.checkers.toggleTodo:
      return toggleCompleted(state, action.payload);
    //affirmation
    case actionType.checkers.setAffirmations:
      return {...state, affirmations: action.payload};
    case actionType.checkers.deleteAffirmation:
      return deleteAffirmation(state, action.payload);

    //quotes
    case actionType.checkers.setQuotes:
      return {...state, quotes: action.payload};
    case actionType.checkers.deleteQuote:
      return deleteQuote(state, action.payload);

    //lists
    case actionType.checkers.setLists:
      return {...state, lists: action.payload};
    case actionType.checkers.deleteList:
      return deleteList(state, action.payload);

    default:
      return state;
  }
};

//todos
const deleteTodo = (state, payload) => {
  const curTodos = [...state.todos];
  const updatedTodos = curTodos.filter(todo => todo.id !== payload);
  return {...state, todos: updatedTodos};
};

const toggleCompleted = (state, payload) => {
  const id = payload;
  const todos = {...state}.todos;
  const updatedTodos = todos.map(todo => {
    const isCompleted = todo.isCompleted;
    if (todo.id === id) {
      return {...todo, isCompleted: !isCompleted};
    } else return todo;
  });
  return {...state, todos: updatedTodos};
};

//quotes
const deleteQuote = (state, payload) => {
  const cur = [...state.quotes];
  const updated = cur.filter(quote => quote.id !== payload);
  return {...state, quotes: updated};
};
//affirmations
const deleteAffirmation = (state, payload) => {
  const cur = [...state.affirmations];
  const updated = cur.filter(affirmation => affirmation.id !== payload);
  return {...state, affirmations: updated};
};

//lists
const deleteList = (state, payload) => {
  console.log('delete');
  const cur = [...state.lists];
  const updated = cur.filter(list => list.id !== payload);
  return {...state, lists: updated};
};
export default CheckerReducer;
