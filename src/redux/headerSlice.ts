import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: string = '';

const headerSlice = createSlice({
  name: 'header',
  initialState,
  reducers: {
    changeHeader(state, action: PayloadAction<string>) {
      state = action.payload;
    }
  }
});

export const { changeHeader } = headerSlice.actions;

export default headerSlice;
