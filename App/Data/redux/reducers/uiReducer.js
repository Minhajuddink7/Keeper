import {actionType} from '../actions/actionType';
const INITIAL_STATE = {
  theme: 'dark',
  userLoggedIn: false,
};

const UiReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionType.ui.setTheme:
      return {...state, theme: action.payload};
    case actionType.ui.changeUserState:
      return {...state, userLoggedIn: action.payload};
    default:
      return state;
  }
};

export default UiReducer;
