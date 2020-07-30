import { types } from '../types/types';
import { combineReducers } from 'redux';
import { uiReducer } from './uiReducer';
import { calendarReducer } from './calendarReducer';

const initialState = {
  modalOpen: false,
};

export const rootReducer = combineReducers({
  ui: uiReducer,
  calendar: calendarReducer,
});
