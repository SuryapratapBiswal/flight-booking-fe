import { configureStore } from "@reduxjs/toolkit";
import flightList from "./apiSlice/flightList";
import travelersReducer from './apiSlice/travelersSlice';


const store = configureStore({
    reducer: {
        flights: flightList,
        travelers: travelersReducer,
    }
})

export default store