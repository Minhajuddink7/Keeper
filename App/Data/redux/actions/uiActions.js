import {actionType} from './actionType';

export const changeTheme = payload => ({
  type: actionType.ui,
  payload: payload,
});
