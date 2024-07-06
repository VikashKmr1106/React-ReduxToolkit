import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  urls: []
};

const imageSlice = createSlice({
  name: 'images',
  initialState,
  reducers: {
    addImage: (state, action) => {
      state.urls.push(action.payload);
    },
    removeImage: (state, action) => {
      state.urls = state.urls.filter(url => url !== action.payload);
    },
    resetImages: (state) => {
      state.urls = [];
    }
  }
});

export const { addImage, removeImage , resetImages } = imageSlice.actions;
export default imageSlice.reducer;
