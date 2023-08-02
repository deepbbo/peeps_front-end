import { configureStore } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from '@reduxjs/toolkit';

import placeReducer from './placeSlice';
import headerReducer from './headerSlice';

// 하나의 root reducer로 합침
const reducers = combineReducers({
  place: placeReducer,
  header: headerReducer.reducer
});

const persistConfig = {
  key: 'root',
  storage, // 로컬스토리지
  whitelist: ['place', 'header'] // 유지하고 싶은 값
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({ serializableCheck: false })
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
