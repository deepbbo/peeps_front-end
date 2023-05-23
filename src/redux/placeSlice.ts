import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PlaceState {
  value: {
    place_name: string;
    category_name: string;
    address_name: string;
    phone: string;
  };
}

const initialState: PlaceState = {
  value: {
    place_name: '',
    category_name: '',
    address_name: '',
    phone: ''
  }
};

const placeSlice = createSlice({
  name: 'place',
  initialState,
  reducers: {
    changePlace(state, action: PayloadAction<PlaceState['value']>) {
      state.value = action.payload;
    }
  }
});

export const { changePlace } = placeSlice.actions;

export default placeSlice;
