import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios'; 
const initialState = {
	loading : null,
	data : null,
	error : null
}

const productSlice = createSlice({
  name : 'product',
	initialState : initialState,
	reducers : {
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

export const { setLoading, setData, setError } = productSlice.actions;
export default productSlice.reducer;

export const getProduct = () => {
	return async (dispatch) => {
		try{
			dispatch(setLoading(true))
			const response = await axios({
			 method : 'get',
			 url : 'https://fakestoreapi.com/products'
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