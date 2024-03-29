import {actionType} from '../actions/actionType';
const INITIAL_STATE = {
  notes: [],
  current_note: {title: '', body: '', isStared: false, label: ''},
  labels: [],
};

const NotesReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionType.notes.setNotes:
      return {...state, notes: action.payload};
    case actionType.notes.setCurrentNote:
      return {...state, current_note: action.payload};
    case actionType.notes.deleteNote:
      return deleteNotes(state, action.payload);
    case actionType.notes.toggleStared:
      return toggleStared(state, action.payload);
    case actionType.notes.addNoteLabel:
      return addNoteLabel(state, action.payload);
    case actionType.notes.removeNoteLabel:
      return RemoveNoteLabel(state, action.payload);
    case actionType.notes.changeNoteLabels:
      return {...state, labels: action.payload};
    default:
      return state;
  }
};

export default NotesReducer;

const deleteNotes = (state, payload) => {
  const curNotes = [...state.notes];

  const updatedNotes = curNotes.filter(note => note.id !== payload);
  return {...state, notes: updatedNotes};
};

const toggleStared = (state, payload) => {
  const {id} = payload;
  const notes = {...state}.notes;
  const updatedNotes = notes.map(note => {
    const isStared = note.isStared;
    if (note.id === id) {
      return {...note, isStared: !isStared};
    } else return note;
  });
  return {...state, notes: updatedNotes};
};

const addNoteLabel = (state, payload) => {
  const curLabels = [...state.labels];
  const updatedLabels = [...curLabels, payload];
  return {...state, labels: updatedLabels};
};
const RemoveNoteLabel = (state, payload) => {
  const curLabels = [...state.labels];
  const updatedLabels = curLabels.filter(cur => cur !== payload);
  return {...state, labels: updatedLabels};
};
