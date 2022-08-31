import ui from './uiReducer';
import {combineReducers} from 'redux';
import NotesReducer from './notesReducer';

export default combineReducers({ui, notes: NotesReducer});
