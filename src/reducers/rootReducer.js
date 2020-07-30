import { types } from '../types/types';
import { combineReducers } from 'redux';
import { uiReducer } from './uiReducer';

const initialState = {
  modalOpen: false,
};

export const rootReducer = combineReducers({
  ui: uiReducer,
});
