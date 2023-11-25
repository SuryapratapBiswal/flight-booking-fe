import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../../components/config/index";



export const searchFlightSliceAsync = createAsyncThunk('searchFlightSliceAsync', async (formData,headers) => {
    try {
        const response = await axios.post(`${BASE_URL}/flight/search-flight-airport`, formData,{headers})
        return response.data
    } catch (error) {
        console.log(error)
    }

})
export const getFlightListSliceAsync = createAsyncThunk('getFlightListSliceAsync', async (formData,headers) => {
    try {
        const response = await axios.get(`${BASE_URL}/flight/flight-search-list
        `,formData,{headers})
        return response.data
    } catch (error) {
        console.log(error)
    }
})
const flightList = createSlice({
    name: "flightlist",
    initialState: {
        flightListData: []
    },
    extraReducers: {
        [getFlightListSliceAsync.fulfilled]: (state, { payload }) => {
            state.flightListData = payload;
        },
    }

})

export default flightList.reducer;