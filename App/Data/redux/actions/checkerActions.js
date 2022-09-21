import {actionType} from './actionType';

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
