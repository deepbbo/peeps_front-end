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
    // 객체를 저장하기 위해선 이전의 값을 스프레드 문법으로 가져와야 한다! 에러 처리
    changePlace: (state, action: PayloadAction<PlaceState['value']>) => {
      state.value = { ...state.value, ...action.payload };
    }
  }
});

export const { changePlace } = placeSlice.actions;

export default placeSlice;
