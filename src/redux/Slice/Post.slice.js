import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
const initialState = {
	// compulsary :
	loading : null,
	data : null,
	error : null
}

const postSlice = createSlice({
	name : 'post',
	initialState : initialState,
	reducers : {
		// setPost : (state , action ) => {
    //   state.loading = true;
		// 	state.data = action.payload,
		// 	state.error = null;
		// }
		setLoading : (state , action) => {
			state.loading = action.payload
		},
		setData : (state , action) => {
			state.data = action.payload
		},
		setError : (state , action) => {
			state.error = action.payload
		}
	}
})

export const { setLoading, setData, setError } = postSlice.actions;
export default postSlice.reducer;

export const getPost = () => {
   return async (dispatch) => {
     try{
			 dispatch(setLoading(true))
       const response = await axios({
				method : 'get',
				url : 'https://jsonplaceholder.typicode.com/posts'
			 })
			 dispatch(setLoading(false))
			 console.log(response.data)
			 dispatch(setData(response.data))
		 }
		 catch(error){
			dispatch(setLoading(false))
			dispatch(setError(error.response.data))
      console.log(error.response.data)
		 }
	 }
}

// redux/Slice/Post.slice.js
// import { createSlice } from '@reduxjs/toolkit';
// import axios from 'axios';

// const initialState = {
//   loading: false,
//   data: [],
//   error: null,
//   page: 1,
//   hasMore: true,
// };

// const postSlice = createSlice({
//   name: 'post',
//   initialState,
//   reducers: {
//     setLoading: (state, action) => {
//       state.loading = action.payload;
//     },
//     setData: (state, action) => {
//       state.data = [...state.data, ...action.payload];
//     },
//     setError: (state, action) => {
//       state.error = action.payload;
//     },
//     incrementPage: (state) => {
//       state.page += 1;
//     },
//     setHasMore: (state, action) => {
//       state.hasMore = action.payload;
//     },
//   },
// });

// export const { setLoading, setData, setError, incrementPage, setHasMore } = postSlice.actions;
// export default postSlice.reducer;

// export const getPost = (page = 1) => {
//   return async (dispatch, getState) => {
//     const { post } = getState();
//     if (post.loading || !post.hasMore) return;

//     try {
//       dispatch(setLoading(true));
//       const response = await axios.get(`https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=10`);
//       if (response.data.length > 0) {
//         dispatch(setData(response.data));
//       } else {
//         dispatch(setHasMore(false));
//       }
//       dispatch(setLoading(false));
//     } catch (error) {
//       dispatch(setLoading(false));
//       dispatch(setError(error.response ? error.response.data : error.message));
//     }
//   };
// };
