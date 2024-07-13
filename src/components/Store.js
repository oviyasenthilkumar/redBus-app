import { configureStore } from '@reduxjs/toolkit';
import TaskSlice from './TaskSlice';
// redux-persist
import { persistReducer } from 'redux-persist';
import { combineReducers } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key:"root",
  version:1,
  storage
};
const reducer = combineReducers({
  redBus: TaskSlice,
})

const persistedReducer = persistReducer(persistConfig,reducer)

export const Store = configureStore({
  reducer: persistedReducer
})
