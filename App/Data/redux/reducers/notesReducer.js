import {actionType} from '../actions/actionType';
const INITIAL_STATE = {
  notes: [],
  current_note: {title: '', body: ''},
};

const NotesReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionType.notes.setNotes:
      return {...state, notes: action.payload};
    case actionType.notes.setCurrentNote:
      return {...state, current_note: action.payload};

    default:
      return state;
  }
};

export default NotesReducer;
