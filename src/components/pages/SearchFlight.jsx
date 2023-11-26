import axios from "axios";
import {
  Button,
  Popover,
  PopoverHandler,
  PopoverContent,
  Typography,
  IconButton,
  Input,
} from "@material-tailwind/react";
import CryptoJS from "crypto-js";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { encryptRequest } from "../../utils/index";
import { backgroundImageUrl } from "../config/index";
import { useDispatch, useSelector } from "react-redux";
import { ArrowLeftRight, Building2, MapPin, StepForward, TimerReset, User2 } from "lucide-react";
import { CURRENCY, BASE_URL, API_KEY, SECRET_KEY } from "../config/index";
import {
  saveTravelerDetails,
  setAdults,
  setChildren,
  setInfants,
} from "../../store/apiSlice/travelersSlice.js";
import { searchFlightToAirport } from "../../store/apiSlice/flightToList.js";
import { searchFlightFromAirport } from "../../store/apiSlice/flightFromList.js";

const SearchFlight = () => {
  const user_id = 0;
  const max_result = 100;
  const travel_type = "oneway";
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [searchKey, setSearchKey] = useState(null);
  const [searchKey2, setSearchKey2] = useState(null);
  const [selectedClass, setSelectedClass] = useState("");
  const [departure_date, setDepartureDate] = useState("");
  const [openFlightTo, setOpenFlightTo] = useState(undefined);
  const [openFlightFrom, setOpenFlightFrom] = useState(undefined);
  const [openTravellers, setopenTravellers] = useState(undefined);
  const [selectedToAirport, setSelectedToAirport] = useState("");
  const [selectedFromAirport, setSelectedFromAirport] = useState("");

  const { adults, children, infants } = useSelector((state) => state.travelers);
  const flightToListData = useSelector(
    (state) => state.flightToData.flightToListData.data
  );
  const flightFromListData = useSelector(
    (state) => state.flightFromData.flightFromListData.data
  );

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
  const handleSave = () => {
    dispatch(saveTravelerDetails({ adults, children, infants }));
    console.log("data saved ", adults, children, infants);
    setopenTravellers(false);
  };

  const handleSearchAirportFrom = async (e) => {
    e.preventDefault();
    dispatch(searchFlightFromAirport(searchKey));
  };
  const handleSearchAirportTo = async (e) => {
    e.preventDefault();
    dispatch(searchFlightToAirport(searchKey2));
  };

  const handleSubmit = async (e) => {
    // debugger
    e.preventDefault();
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
    if (response && response.data) {
      const decryptedResponse = CryptoJS.AES.decrypt(
        response.data.response_data,
        SECRET_KEY
      );
      const jsonResponse = JSON.parse(
        decryptedResponse.toString(CryptoJS.enc.Utf8)
      );

      navigate("/flight/list");
    } else {
      console.error("Error: Unexpected response structure", response);
    }
  };
  const handleAirportFromSelection = (selectedAirport) => {
    setSelectedFromAirport(selectedAirport.short_name);
    setOpenFlightFrom(false);
  };
  const handleAirportToSelection = (selectedAirport) => {
    setSelectedToAirport(selectedAirport.short_name);
    setOpenFlightTo(false);
  };
  return (
    <section
      className="h-screen flex flex-col bg-cover items-center justify-center"
      style={{ backgroundImage: `url(${backgroundImageUrl})` }}
    >
      <div className="flex justify-start gap-4 mb-5">
        <Button style={{textTransform:"none",backgroundColor:"#232A30", borderRadius:"25px"}}>
          <div className="flex gap-2 items-center">
            <StepForward />
            <div>
              <p>One way</p>
            </div>
          </div>
        </Button>
        <Button style={{textTransform:"none",backgroundColor:"#232A30",borderRadius:"25px"}}>
          <div className="flex gap-2 items-center">
          <TimerReset />
            <div>
              <p>Round Trip</p>
            </div>
          </div>
        </Button>
        <Button style={{textTransform:"none",backgroundColor:"#232A30",borderRadius:"25px"}}>
          <div className="flex gap-2 items-center">
          <Building2 />
            <div>
              <p>Multi-City</p>
            </div>
          </div>
        </Button>
      </div>
      <form
        className="text-white w-full md:w-[80%] h-[50%] bg-[#13171A] rounded-md shadow-md px-5 py-3 md:px-10 md:py-5"
        onSubmit={handleSubmit}
      >
        <div className="my-4 grid gap-4 grid-cols-1 md:grid-cols-3 mb-4">
          <div className="col-span-2 flex justify-around ">
            <div className="flex gap-3 flex-col">
              <label htmlFor="" className="text-base font-medium text-white ">
                Flying From
              </label>
              <Popover placement="bottom" open={openFlightFrom}>
                <PopoverHandler>
                  <Button
                    style={{
                      minWidth: 300,
                      backgroundColor: "#232A30",
                      textTransform: "none",
                    }}
                  >
                    <div className="flex gap-2 justify-between items-center">
                      <div className="text-white">
                        {selectedFromAirport || "Flying From"}
                      </div>
                      <MapPin color="#02ABC1" />
                    </div>
                  </Button>
                </PopoverHandler>
                <PopoverContent className="w-96 bg-[#232A30]">
                  <Typography variant="h6" color="white" className="mb-6">
                    Select Flying From Airport name
                  </Typography>
                  <Typography
                    variant="small"
                    color="white"
                    className="mb-1 font-bold"
                  >
                    Flying From
                  </Typography>
                  <div className="flex gap-2">
                    <Input
                      size="lg"
                      placeholder="Search City OR Airport"
                      className=" !border-t-blue-gray-200 focus:!border-t-gray-900 text-white"
                      labelProps={{
                        className: "before:content-none after:content-none",
                      }}
                      value={searchKey}
                      onChange={(e) => setSearchKey(e.target.value)}
                    />
                    <Button
                      variant="gradient"
                      className="flex-shrink-0"
                      style={{
                        textTransform: "none",
                        backgroundColor: "#02ABC1 !important",
                      }}
                      onClick={handleSearchAirportFrom}
                    >
                      Search City
                    </Button>
                  </div>
                  {flightFromListData?.length > 0 &&
                    flightFromListData.map((item) => {
                      return (
                        <div
                          key={item.id}
                          className="cursor-pointer hover:bg-gray-100 p-2"
                          onClick={() => handleAirportFromSelection(item)}
                        >
                          <p className="text-xs mb-1">{item.short_name}</p>
                        </div>
                      );
                    })}
                </PopoverContent>
              </Popover>
            </div>
            <div className="flex items-end">
              <ArrowLeftRight size={40} />
            </div>
            <div className="flex gap-3 flex-col">
              <label htmlFor="" className="text-base font-medium text-white ">
                Flying to
              </label>
              <Popover placement="bottom" open={openFlightTo}>
                <PopoverHandler>
                  <Button
                    style={{
                      minWidth: 300,
                      backgroundColor: "#232A30",
                      textTransform: "none",
                    }}
                  >
                    <div className="flex gap-2 justify-between items-center">
                      <div className="text-white">
                        {selectedToAirport || "Flying to"}
                      </div>
                      <MapPin color="#02ABC1" />
                    </div>
                  </Button>
                </PopoverHandler>
                <PopoverContent className="w-96 bg-[#232A30]">
                  <Typography variant="h6" color="white" className="mb-6">
                    Select Flying to Airport name
                  </Typography>
                  <Typography
                    variant="small"
                    color="white"
                    className="mb-1 font-bold"
                  >
                    Flying to
                  </Typography>
                  <div className="flex gap-2">
                    <Input
                      size="lg"
                      placeholder="Search City OR Airport"
                      className=" !border-t-blue-gray-200 focus:!border-t-gray-900 text-white"
                      labelProps={{
                        className: "before:content-none after:content-none",
                      }}
                      value={searchKey2}
                      onChange={(e) => setSearchKey2(e.target.value)}
                    />
                    <Button
                      variant="gradient"
                      className="flex-shrink-0"
                      style={{ textTransform: "none" }}
                      onClick={handleSearchAirportTo}
                    >
                      Search City
                    </Button>
                  </div>
                  {flightToListData?.length > 0 &&
                    flightToListData.map((item) => {
                      return (
                        <div
                          key={item.id}
                          className="cursor-pointer hover:bg-gray-100 p-2"
                          onClick={() => handleAirportToSelection(item)}
                        >
                          <p className="text-xs mb-1">{item.short_name}</p>
                        </div>
                      );
                    })}
                </PopoverContent>
              </Popover>
            </div>
          </div>
          <div className="flex gap-3 flex-col">
            <label htmlFor="" className="text-base font-medium text-white ">
              Departure Date
            </label>
            <input
              type="date"
              className="flex h-10 w-full rounded-md border border-gray-300 bg-[#232A30] px-3 py-4 text-sm text-[#C5C5D2] placeholder:text-gray-400 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
              value={departure_date}
              onChange={(e) => setDepartureDate(e.target.value)}
            />
          </div>
        </div>
        <div className="px-5 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex gap-3 flex-col">
            <label htmlFor="" className="text-base font-medium text-white ">
              Traveller(s)
            </label>
            <Popover placement="bottom" open={openTravellers}>
              <PopoverHandler>
                <Button
                  style={{ textTransform: "none", backgroundColor: "#232A30" }}
                >
                  <div className="flex justify-evenly items-center">
                    <User2 color="#02ABC1" />
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
              className="px-3 py-4 rounded-md text-xs "
              style={{ minWidth: 300, backgroundColor: "#232A30" }}
              value={selectedClass}
              onChange={(e) => handleClassChange(e.target.value)}
            >
              <option value="" disabled hidden>
                Select Class
              </option>
              <option value="ECONOMY">Economy</option>
              <option value="PREMIUM ECONOMY">Premium Economy</option>
              <option value="BUSINESS">Business</option>
              <option value="FIRST">First</option>
            </select>
          </div>
        </div>
        <div className="flex mt-5 justify-center  items-center">
          <Button type="submit" className="bg-[#02ABC1]">
            Submit
          </Button>
        </div>
      </form>
    </section>
  );
};

export default SearchFlight;
