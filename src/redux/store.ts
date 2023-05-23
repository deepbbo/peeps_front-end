import { configureStore } from '@reduxjs/toolkit';
import placeReducer from './place';

export default configureStore({
  reducer: { place: placeReducer }
});
