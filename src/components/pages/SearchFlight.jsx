import {
  Button,
  Popover,
  PopoverHandler,
  PopoverContent,
  Typography,
  IconButton,
} from "@material-tailwind/react";
import { ArrowLeftRight, User2 } from "lucide-react";
import React, { useState } from "react";
import { backgroundImageUrl } from "../config/index";
import CryptoJS from "crypto-js";

// import { getFlightListSliceAsync } from "../../store/apiSlice/flightList";
import { CURRENCY, BASE_URL, API_KEY, SECRET_KEY } from "../config/index";
import { useNavigate } from "react-router-dom";
import { encryptRequest } from "../../utils/index";
import axios from "axios";
import {
  saveTravelerDetails,
  setAdults,
  setChildren,
  setInfants,
} from "../../store/apiSlice/travelersSlice.js";
import { useDispatch, useSelector } from "react-redux";

const SearchFlight = () => {
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedFromAirport, setSelectedFromAirport] = useState("");
  const [selectedToAirport, setSelectedToAirport] = useState("");
  const [departure_date, setDepartureDate] = useState("");
  const [searchKey, setSearchKey] = useState("");

  const travel_type = "oneway";
  const max_result = 100;
  const user_id = 0;
  const { adults, children, infants } = useSelector((state) => state.travelers);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log("selextedClass", selectedClass);
  const handleIncrement = (type) => {
    switch (type) {
      case "adults":
        dispatch(setAdults(adults + 1));
        break;
      case "children":
        dispatch(setChildren(children + 1));
        break;
      case "infants":
        dispatch(setInfants(infants + 1));
        break;
      default:
        break;
    }
  };
  const handleDecrement = (type) => {
    switch (type) {
      case "adults":
        dispatch(setAdults(adults - 1));
        break;
      case "children":
        dispatch(setChildren(children - 1));
        break;
      case "infants":
        dispatch(setInfants(infants - 1));
        break;
      default:
        break;
    }
  };
  const handleClassChange = (value) => {
    setSelectedClass(value);
  };
  const handleFromAirportChange = (value) => {
    setSelectedFromAirport(value);
  };
  const handleToAirportChange = (value) => {
    setSelectedToAirport(value);
  };

  const handleSave = () => {
    dispatch(saveTravelerDetails({ adults, children, infants }));
    console.log("data saved ", adults, children, infants);
  };
  const handleSearch = async (e) => {
    // debugger
    e.preventDefault();
    try {
      const encryptedRequest = encryptRequest(
        {
          search_key: searchKey,
        },
        SECRET_KEY
      );
      console.log("encrypted data ", encryptedRequest);

      const headers = {
        apikey: API_KEY,
        currency: CURRENCY,
      };
      const requestBody = {
        request_data: encryptedRequest,
      };
      const response = await axios.post(
        BASE_URL + "/flight/flight-search-list",
        requestBody,
        {
          headers,
        }
      );
      console.log(response.data);
      if (response && response.data) {
        const decryptedResponse = CryptoJS.AES.decrypt(
          response.data.response_data,
          SECRET_KEY
        );
        const jsonResponse = JSON.parse(
          decryptedResponse.toString(CryptoJS.enc.Utf8)
        );
        console.log("jsonResponse is :", jsonResponse);
        // navigate("/flight/list");
      } else {
        console.error("Error: Unexpected response structure", response);
      }
    } catch (error) {
      console.error("Error:", error?.response?.data);
    }
  };
  const obj = {
    from_airport: selectedFromAirport,
    to_airport: selectedToAirport,
    departure_date: departure_date,
    return_date: "YYYY-MM-DD",
    adults: adults,
    childs: children,
    infants: infants,
    class_type: selectedClass,
    travel_type: travel_type,
    max_result: max_result,
    user_id: user_id,
  };

  const handleSubmit = async (e) => {
    debugger
    e.preventDefault();
    // console.log("obj data is :", obj);
    const encryptedRequest = encryptRequest(
      {
        from_airport: selectedFromAirport,
        to_airport: selectedToAirport,
        departure_date: departure_date,
        return_date: "YYYY-MM-DD",
        adults: adults,
        childs: children,
        infants: infants,
        class_type: selectedClass,
        travel_type: travel_type,
        max_result: max_result,
        user_id: user_id,
      },
      SECRET_KEY
    );
    console.log("data:", encryptedRequest);

    const headers = {
      apikey: API_KEY,
      currency: CURRENCY,
    };

    const requestBody = {
      request_data: encryptedRequest,
    };
    const response = await axios.post(
      BASE_URL + "/flight/flight-search-list",
      requestBody,
      {
        headers,
      }
    );
    console.log("response.data", response.data);
    if (response && response.data) {
      const decryptedResponse = CryptoJS.AES.decrypt(
        response.data.response_data,
        SECRET_KEY
      );
      const jsonResponse = JSON.parse(
        decryptedResponse.toString(CryptoJS.enc.Utf8)
      );
      console.log(jsonResponse);
      navigate("/flight/list");
    } else {
      console.error("Error: Unexpected response structure", response);
    }
  };
  return (
    <section
      className="h-screen flex items-center justify-center flex-col bg-cover"
      style={{ backgroundImage: `url(${backgroundImageUrl})` }}
    >
      <form className="flex gap-5 justify-center mb-5" onSubmit={handleSearch}>
        <input
          type="text"
          value={searchKey}
          onChange={(e) => setSearchKey(e.target.value)}
          placeholder="Search flight here..."
          className="flex h-10 w-full rounded-md border border-gray-300 bg-[#232A30] px-3 py-2 text-sm text-[#C5C5D2] placeholder:text-gray-400 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
        />
        <Button type="submit" className="bg-[#02ABC1]">
          Search
        </Button>
      </form>
      <form
        className="text-white w-[80%] h-[50%] bg-[#13171A] rounded-md shadow-md px-10 py-5"
        onSubmit={handleSubmit}
      >
        <div className="my-4 grid gap-4 grid-cols-3 mb-4">
          <div className="col-span-2 flex justify-around ">
            <div className="flex gap-3 flex-col">
              <label htmlFor="" className="text-base font-medium text-white ">
                Flying From
              </label>
              <select
                size="md"
                label="Select Version"
                className="px-3 py-3 rounded-md text-xs "
                style={{ minWidth: 300, backgroundColor: "#232A30" }}
                value={selectedFromAirport}
                onChange={(e) => handleFromAirportChange(e.target.value)}
              >
                <option value="Mumbai">Mumbai</option>
                <option value="Delhi">Delhi</option>
                <option value="Pune">Pune</option>
                <option value="Bhubaneswar">Bhubaneswar</option>
                <option value="Jammu & Kashmir">jammu & Kashmir</option>
              </select>
            </div>
            <div className="flex items-end">
              <ArrowLeftRight size={40} />
            </div>
            <div className="flex gap-3 flex-col">
              <label htmlFor="" className="text-base font-medium text-white ">
                Flying to
              </label>
              <select
                size="md"
                label="Select Version"
                className="px-3 py-3 rounded-md text-xs "
                style={{ minWidth: 300, backgroundColor: "#232A30" }}
                value={selectedToAirport}
                onChange={(e) => handleToAirportChange(e.target.value)}
              >
                <option value="Mumbai">Mumbai</option>
                <option value="Delhi">Delhi</option>
                <option value="Pune">Pune</option>
                <option value="Bhubaneswar">Bhubaneswar</option>
                <option value="Jammu & Kashmir">jammu & Kashmir</option>
              </select>
            </div>
          </div>
          <div className="flex gap-3 flex-col">
            <label htmlFor="" className="text-base font-medium text-white ">
              Departure Date
            </label>
            <input
              type="date"
              className="flex h-10 w-full rounded-md border border-gray-300 bg-[#232A30] px-3 py-2 text-sm text-[#C5C5D2] placeholder:text-gray-400 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
              value={departure_date}
              onChange={(e) => setDepartureDate(e.target.value)}
            />
          </div>
        </div>
        <div className="px-5 grid grid-cols-3 gap-4">
          <div className="flex gap-3 flex-col">
            <label htmlFor="" className="text-base font-medium text-white ">
              Traveller(s)
            </label>
            <Popover placement="bottom">
              <PopoverHandler>
                <Button
                  style={{ textTransform: "none", backgroundColor: "#232A30" }}
                >
                  <div className="flex justify-evenly items-center">
                    <User2 />
                    <div>{adults} Adults</div>
                    <div className="w-[10px] h-[10px] rounded-full bg-[#02ABC1]" />
                    <div>{children} Child</div>
                    <div className="w-[10px] h-[10px] rounded-full bg-[#02ABC1]" />
                    <div> {infants} Infant</div>
                  </div>
                </Button>
              </PopoverHandler>
              <PopoverContent className="w-96">
                <Typography variant="h6" color="blue-gray" className="mb-6">
                  Travellers
                </Typography>
                <div className="flex justify-between">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="mb-1 font-bold"
                  >
                    Adults
                  </Typography>
                  <div className="flex gap-3 items-center">
                    <IconButton
                      style={{ backgroundColor: "#02ABC1", fontSize: "16px" }}
                      onClick={() => handleDecrement("adults")}
                    >
                      -
                    </IconButton>
                    <Typography variant="h6">{adults}</Typography>
                    <IconButton
                      style={{ backgroundColor: "#02ABC1", fontSize: "16px" }}
                      onClick={() => handleIncrement("adults")}
                    >
                      +
                    </IconButton>
                  </div>
                </div>
                <hr className="my-1" />
                <div className="flex justify-between">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="mb-1 font-bold"
                  >
                    Childrean (3-12 yrs.)
                  </Typography>
                  <div className="flex gap-3 items-center">
                    <IconButton
                      style={{ backgroundColor: "#02ABC1", fontSize: "16px" }}
                      onClick={() => handleDecrement("children")}
                    >
                      -
                    </IconButton>
                    <Typography variant="h6">{children}</Typography>
                    <IconButton
                      style={{ backgroundColor: "#02ABC1", fontSize: "16px" }}
                      onClick={() => handleIncrement("children")}
                    >
                      +
                    </IconButton>
                  </div>
                </div>
                <hr className="my-1" />
                <div className="flex justify-between">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="mb-1 font-bold"
                  >
                    Infant (0-2 yrs.)
                  </Typography>
                  <div className="flex gap-3 items-center">
                    <IconButton
                      style={{ backgroundColor: "#02ABC1", fontSize: "16px" }}
                      onClick={() => handleDecrement("infants")}
                    >
                      -
                    </IconButton>
                    <Typography variant="h6">{infants}</Typography>
                    <IconButton
                      style={{ backgroundColor: "#02ABC1", fontSize: "16px" }}
                      onClick={() => handleIncrement("infants")}
                    >
                      +
                    </IconButton>
                  </div>
                </div>
                <hr className="my-1" />
                <hr className="my-3" />
                <div className="flex gap-2">
                  <Button
                    variant="gradient"
                    className="flex-shrink-0 w-full bg-[#02ABC1] text-white"
                    style={{ textTransform: "none" }}
                    onClick={handleSave}
                    
                  >
                    Done
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
          </div>
          <div className="flex gap-3 flex-col">
            <label htmlFor="" className="text-base font-medium text-white ">
              Prefered Class
            </label>
            <select
              size="md"
              label="Select Class"
              className="px-3 py-3 rounded-md text-xs "
              style={{ minWidth: 300, backgroundColor: "#232A30" }}
              value={selectedClass}
              onChange={(e) => handleClassChange(e.target.value)}
            >
              <option value="ECONOMY">Economy</option>
              <option value="PREMIUM ECONOMY">Premium Economy</option>
              <option value="BUSINESS">Business</option>
              <option value="FIRST">First</option>
            </select>
          </div>
        </div>
        <div className="flex mt-10 justify-center items-center">
          <Button type="submit" className="bg-[#02ABC1]">
            Submit
          </Button>
        </div>
      </form>
    </section>
  );
};

export default SearchFlight;
