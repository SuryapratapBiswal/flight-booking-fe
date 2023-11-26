import React, { useState } from "react";
import NavbarDark from "../Navbar";
import { MapPin } from "lucide-react";
import { Button } from "@material-tailwind/react";

const FlightDetails = () => {
  return (
    <>
      <div className="">
        <div className=" bg-[#F5F9FA] rounded-lg">
          <div className="ml-[12.5%] mb-2">
            <p className="text-xs font-bold text-blue-500">
              Depart{" "}
              <span className="font-bold text-xs text-black">DEL-DOH</span>
            </p>
            <p className="font-bold text-xs">
              Sun 27 Aug 2023 ECONOMY{" "}
              <span className="text-xs font-light text-gray-60">
                4 hrs 30 mins
              </span>
            </p>
          </div>

          <hr />

          <div className="flex justify-around px-[70px]">
            <div>
              <img
                className="h-16"
                src="https://1000logos.net/wp-content/uploads/2020/03/Qatar-Airways-Logo.png"
                alt="airlines_logo"
              />
              <p className="font-bold text-xs">QATAR AIRWAYS</p>
              <p className="text-xs font-light text-gray-600">
                AIRBUS A330-200
              </p>
            </div>
            <div>
              <p className="text-xs font-semibold">Sun 27 Aug 2023</p>
              <p className="text-xs font-bold">10:35</p>
              <p className="text-xs font-bold">DEL</p>
              <p className="font-bold text-xs text-gray-700">
                {" "}
                Indira Gandhi International <br></br>Airport, Delhi, India (DEL)
              </p>
            </div>
            <div className="flex flex-col justify-center items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-10 h-10"
              >
                <path
                  fillRule="evenodd"
                  d="M16.72 7.72a.75.75 0 011.06 0l3.75 3.75a.75.75 0 010 1.06l-3.75 3.75a.75.75 0 11-1.06-1.06l2.47-2.47H3a.75.75 0 010-1.5h16.19l-2.47-2.47a.75.75 0 010-1.06z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div>
              <p className="text-xs font-semibold">Sun 27 Aug 2023</p>
              <p className="text-xs font-bold">12:35</p>
              <p className="text-xs font-bold">DOH</p>
              <p className="font-bold text-xs text-gray-700">
                {" "}
                Hamad International <br></br>Airport, Doha, Qatar
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const FlightLists = () => {
  const [showDetails, setShowDetails] = useState(false);

  const toggleButton = () => {
    setShowDetails(!showDetails);
  };
  return (
    <div>
      <NavbarDark />
      <div className="h-screen  ">
        <div className="">
          <div className="flex justify-around px-4 py-10">
            <div>
              <div className="flex items-center gap-2">
                <MapPin color="#02ABC1" />
                <p className="text-sm font-light text-gray-400">From Station</p>
              </div>
              <div className="pl-8">
                <p className="font-bold text-base">
                  {" "}
                  Indira Gandhi International <br></br>Airport, Delhi, India
                  (DEL)
                </p>
                <p>{"Sun 27 Aug 2023"}</p>
              </div>
            </div>
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-10 h-10"
              >
                <path
                  fillRule="evenodd"
                  d="M16.72 7.72a.75.75 0 011.06 0l3.75 3.75a.75.75 0 010 1.06l-3.75 3.75a.75.75 0 11-1.06-1.06l2.47-2.47H3a.75.75 0 010-1.5h16.19l-2.47-2.47a.75.75 0 010-1.06z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <MapPin color="#02ABC1" />
                <p className="text-sm font-light text-gray-400">To Station</p>
              </div>
              <div className="pl-8">
                <p className="font-bold text-base">
                  {" "}
                  London Heathrow Airport,<br></br> London, United Kingdom (LHR)
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="">
          <div className=" bg-[#F5F9FA] rounded-lg">
            <div className="ml-[10%] mb-2">
              <p className="text-xs">ECONOMY</p>
            </div>
            <div className="flex justify-around px-[70px]">
              <div>
                <img
                  className="h-16"
                  src="https://1000logos.net/wp-content/uploads/2020/03/Qatar-Airways-Logo.png"
                  alt="airlines_logo"
                />
              </div>
              <div>
                <p className="text-lg font-semibold">10:35</p>
                <p className="text-xs">DEL</p>
              </div>
              <div className="flex flex-col justify-center items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-10 h-10"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.72 7.72a.75.75 0 011.06 0l3.75 3.75a.75.75 0 010 1.06l-3.75 3.75a.75.75 0 11-1.06-1.06l2.47-2.47H3a.75.75 0 010-1.5h16.19l-2.47-2.47a.75.75 0 010-1.06z"
                    clipRule="evenodd"
                  />
                </svg>
                <div className="flex gap-11 items-center justify-center">
                  <p className="text-xs text-gray-800">14 hrs and 20 mins</p>
                  <div className="w-2 h-2 rounded-full bg-blue-gray-500"></div>
                  <p className="text-xs text-gray-800">Onestop</p>
                </div>
              </div>
              <div>
                <p className="text-lg font-semibold">20:25</p>
                <p className="text-xs">LHR</p>
              </div>
              <div>
                <p>$540</p>
                <Button
                  type="submit"
                  className="bg-[#02ABC1]"
                  style={{ textTransform: "none" }}
                >
                  Select
                </Button>
              </div>
            </div>
          </div>
          <div className="px-[120px]">
            <Button
              color="blue"
              style={{ textTransform: "none" }}
              variant="text"
              onClick={toggleButton}
            >
              {showDetails ? "View More" : "Hide Details"}
            </Button>
          </div>
          {showDetails ? (
            <div>
              <FlightDetails />
              <FlightDetails />
              <FlightDetails />
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default FlightLists;
