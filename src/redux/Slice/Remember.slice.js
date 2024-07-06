
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  checked: false,
  email: '',
  password: ''
};

const rememberSlice = createSlice({
  name: 'remember',
  initialState,
  reducers: {
    setRemember: (state, action) => {
      Object.assign(state, {
        checked: true,
        email: action.payload.email,
        password: action.payload.password
      });
    },
    eraseRemember: (state) => {
      Object.assign(state, {
        checked: false,
        email: '',
        password: ''
      });
    }
  }
});

export const { setRemember, eraseRemember } = rememberSlice.actions;
export default rememberSlice.reducer;


