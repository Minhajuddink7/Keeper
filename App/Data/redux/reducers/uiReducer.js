import {actionType} from '../actions/actionType';
const INITIAL_STATE = {
  theme: 'dark',
};

const UiReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionType.ui.setTheme:
      return {...state, theme: action.payload};
    default:
      return state;
  }
};

export default UiReducer;
