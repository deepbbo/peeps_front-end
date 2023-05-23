import { configureStore } from '@reduxjs/toolkit';
import placeReducer from './placeSlice';
import headerReducer from './headerSlice';

const store = configureStore({
  reducer: {
    place: placeReducer.reducer,
    header: headerReducer.reducer
  }
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
