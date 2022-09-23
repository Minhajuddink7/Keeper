import {actionType} from './actionType';

export const changeTheme = payload => ({
  type: actionType.ui.changeTheme,
  payload: payload,
});
export const changeUserState = payload => ({
  type: actionType.ui.changeUserState,
  payload: payload,
});
