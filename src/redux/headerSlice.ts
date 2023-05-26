import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: string = '';

const headerSlice = createSlice({
  name: 'header',
  initialState,
  reducers: {
    changeHeader(state, action: PayloadAction<string>) {
      state = action.payload;
      return state; // 상태 객체 반환
    }
  }
});

export const { changeHeader } = headerSlice.actions;

export default headerSlice;
