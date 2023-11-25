
import { createSlice } from '@reduxjs/toolkit';

export const saveTravelerDetails = (details) => (dispatch) => {
    dispatch({
      type: 'travelers/saveDetails',
      payload: details,
    });
  };

const initialState = {
  adults: 1,
  children: 0,
  infants: 0,
};

const travelersSlice = createSlice({
  name: 'travelers',
  initialState,
  reducers: {
    setAdults: (state, action) => {
      state.adults = action.payload;
    },
    setChildren: (state, action) => {
      state.children = action.payload;
    },
    setInfants: (state, action) => {
      state.infants = action.payload;
    },
    saveDetails: (state, action) => {
        const { adults, children, infants } = action.payload;
        state.adults = adults;
        state.children = children;
        state.infants = infants;
      },
  },
});

export const { setAdults, setChildren, setInfants } = travelersSlice.actions;
export default travelersSlice.reducer;
