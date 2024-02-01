import ui from './uiReducer';
import {combineReducers} from 'redux';
import NotesReducer from './notesReducer';
import CheckerReducer from './checkerReducer';
import FinanceReducer from './financeReducer';

export default combineReducers({
  ui,
  notes: NotesReducer,
  checker: CheckerReducer,
  finance: FinanceReducer,
});
