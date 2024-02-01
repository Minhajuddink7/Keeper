import {actionType} from '../actions/actionType';
const INITIAL_STATE = {
  stocksList: [],
};

const FinanceReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    //stocks
    case actionType.finance.setStocksList:
      return {...state, stocksList: action.payload};
    case actionType.finance.deleteStocksList:
      return deleteStockList(state, action.payload);

    default:
      return state;
  }
};

//lists
const deleteStockList = (state, payload) => {
  // console.log('delete');
  const cur = [...state.stocksList];
  const updated = cur.filter(list => list.id !== payload);
  return {...state, stocksList: updated};
};
export default FinanceReducer;
