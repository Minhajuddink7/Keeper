import {actionType} from './actionType';

export const changeNotes = payload => ({
  type: actionType.notes.setNotes,
  payload: payload,
});
export const changeCurrentNote = payload => ({
  type: actionType.notes.setCurrentNote,
  payload: payload,
});
export const deleteNote = payload => ({
  type: actionType.notes.deleteNote,
  payload: payload,
});
export const toggleStared = payload => ({
  type: actionType.notes.toggleStared,
  payload: payload,
});
export const changeNoteLabels = payload => ({
  type: actionType.notes.changeNoteLabels,
  payload: payload,
});
export const addNoteLabel = payload => ({
  type: actionType.notes.addNoteLabel,
  payload: payload,
});
export const removeNoteLabel = payload => ({
  type: actionType.notes.removeNoteLabel,
  payload: payload,
});
