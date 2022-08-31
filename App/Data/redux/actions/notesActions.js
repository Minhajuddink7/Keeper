import {actionType} from './actionType';

export const changeNotes = payload => ({
  type: actionType.notes.setNotes,
  payload: payload,
});
export const changeCurrentNote = payload => ({
  type: actionType.notes.setCurrentNote,
  payload: payload,
});
