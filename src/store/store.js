import { configureStore } from "@reduxjs/toolkit";
import flightAirportFromList from "./apiSlice/flightFromList";
import flightAirportToList from "./apiSlice/flightToList";
import travelersReducer from './apiSlice/travelersSlice';


const store = configureStore({
    reducer: {
        travelers: travelersReducer,
        flightToData: flightAirportToList,
        flightFromData: flightAirportFromList,
    }
})

export default store