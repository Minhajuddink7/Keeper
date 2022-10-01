import {actionType} from './actionType';

//todo actions
export const changeTodos = payload => ({
  type: actionType.checkers.setTodos,
  payload: payload,
});
export const deleteTodo = payload => ({
  type: actionType.checkers.deleteTodo,
  payload: payload,
});
export const toggleTodo = payload => ({
  type: actionType.checkers.toggleTodo,
  payload: payload,
});

//affirmations actions
export const changeAffirmations = payload => ({
  type: actionType.checkers.setAffirmations,
  payload: payload,
});
export const deleteAffirmation = payload => ({
  type: actionType.checkers.deleteAffirmation,
  payload: payload,
});

//quotes actions
export const changeQuotes = payload => ({
  type: actionType.checkers.setQuotes,
  payload: payload,
});
export const deleteQuote = payload => ({
  type: actionType.checkers.deleteQuote,
  payload: payload,
});
