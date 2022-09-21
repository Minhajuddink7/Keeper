import ui from './uiReducer';
import {combineReducers} from 'redux';
import NotesReducer from './notesReducer';
import CheckerReducer from './checkerReducer';

export default combineReducers({
  ui,
  notes: NotesReducer,
  checker: CheckerReducer,
});
