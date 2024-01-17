export const actionType = {
  ui: {setTheme: 'SET_THEME', changeUserState: 'CHANGE_USER_STATE'},
  notes: {
    setNotes: 'SET_NOTES',
    setCurrentNote: 'SET_CURRENT_NOTE',
    deleteNote: 'DELETE_NOTE',
    toggleStared: 'TOGGLE_STARED',
    changeNoteLabels: 'CHANGE_LABELS',
    addNoteLabel: 'ADD_NOTE_LABEL',
    removeNoteLabel: 'REMOVE_NOTE_LABEL',
  },
  checkers: {
    //todos
    setTodos: 'SET_TODOS',
    toggleTodo: 'TOGGLE_TODO',
    deleteTodo: 'DELETE_TODO',
    //affirmation
    setAffirmations: 'SET_AFFIRMATIONs',
    deleteAffirmation: 'DELETE_AFFIRMATION',

    //quotes
    setQuotes: 'SET_QUOTES',
    togglePinnedQuote: 'TOGGLE_PINNED_QUOTE',
    deleteQuote: 'DELETE_QUOTE',

    //lists
    setLists: 'SET_LISTS',
    deleteList: 'DELETE_LIST',
  },
};
