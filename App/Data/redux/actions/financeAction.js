import {actionType} from './actionType';

//list actions
export const changeStockList = payload => ({
  type: actionType.finance.setStocksList,
  payload: payload,
});
export const deleteStockList = payload => ({
  type: actionType.finance.deleteStocksList,
  payload: payload,
});
