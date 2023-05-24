import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Place {
  place_name: string;
  category_name: string;
  address_name: string;
  phone: string;
}

const initialState: Place = {
  place_name: '',
  category_name: '',
  address_name: '',
  phone: ''
};

const placeSlice = createSlice({
  name: 'place',
  initialState,
  reducers: {
    changePlace: (state, action: PayloadAction<Place>) => {
      const { place_name, category_name, address_name, phone } = action.payload;
      return {
        ...state,
        place_name,
        category_name,
        address_name,
        phone
      };
    }
  }
});

export const { changePlace } = placeSlice.actions;

export default placeSlice.reducer; // reducer를 export해야 합니다.
