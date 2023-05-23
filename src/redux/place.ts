import { createSlice } from '@reduxjs/toolkit';

const placeSlice = createSlice({
  name: 'place',
  initialState: {
    value: { place_name: '', category_name: '', address_name: '', phone: '' }
  },
  reducers: {
    changePlace(state, action) {
      state.value = action.payload;
    }
  }
});

export const { changePlace } = placeSlice.actions; // @ts-ignore

export default placeSlice.reducer;
