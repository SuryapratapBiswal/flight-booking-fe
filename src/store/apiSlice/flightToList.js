import axios from "axios";
import CryptoJS from "crypto-js";
import { encryptRequest } from "../../utils/index";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  CURRENCY,
  BASE_URL,
  API_KEY,
  SECRET_KEY,
} from "../../components/config/index";

export const searchFlightToAirport = createAsyncThunk(
  "searchFlightToAirport",
  async (searchKey) => {
    try {
      const encryptedRequest = encryptRequest(
        {
          search_key: searchKey || null,
        },
        SECRET_KEY
      );

      const headers = {
        apikey: API_KEY,
        currency: CURRENCY,
      };
      const requestBody = {
        request_data: encryptedRequest,
      };
      const response = await axios.post(
        BASE_URL + "/flight/search-flight-airport",
        requestBody,
        { headers }
      );

      if (response && response.data) {
        const decryptedResponse = CryptoJS.AES.decrypt(
          response.data.response_data,
          SECRET_KEY
        );
        const jsonResponse = JSON.parse(
          decryptedResponse.toString(CryptoJS.enc.Utf8)
        );
        return jsonResponse
      } else {
        console.error("Error: Unexpected response structure", response);
      }
    } catch (error) {
      console.error("Error:", error?.response?.data);
    }
  }
);
const flightAirportToList = createSlice({
  name: "flightAirportToList",
  initialState: {
    flightToListData: {},
  },
  extraReducers: {
    [searchFlightToAirport.fulfilled]: (state, { payload }) => {
      state.flightToListData = payload;
    },
  },
});

export default flightAirportToList.reducer;
