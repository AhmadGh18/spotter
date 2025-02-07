import { Suspense, useEffect, useRef, useState } from "react";
import { Calendar } from "primereact/calendar";
import { motion } from "framer-motion";
import "primereact/resources/themes/lara-dark-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import axiosClient from "../axiosClient";
import FlightList from "./FlightList";
import { Canvas } from "@react-three/fiber";
import CameraFollow from "./CameraFllow";
import Airplane from "./Airplane";
import { OrbitControls } from "@react-three/drei";

export default function FlightSearch() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState(null);
  const [returnDate, setreturnDate] = useState(null);
  const [adults, setAdults] = useState(null);
  const [children, setChildren] = useState(null);
  const [infants, setInfants] = useState(null);
  const [flightClass, setFlightClass] = useState("Economy");
  const [fromResults, setFromResults] = useState([]);
  const [toResults, setToResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [info, setFlightsInfo] = useState(null);
  // Function to fetch airport suggestions
  const fetchAirports = async (query, setResults) => {
    if (!query) {
      setResults([]);
      return;
    }

    try {
      const response = await axiosClient.get("/flights/searchAirport", {
        params: { query, locale: "en-US" },
      });
      setResults(response.data.data || []);
    } catch (error) {
      console.error("Error fetching airports:", error);
      setResults([]);
    }
  };

  // Select airport
  const handleSelectFrom = (airport) => {
    setFrom(airport);
    setTimeout(() => setFromResults([]), 0);
  };

  const handleSelectTo = (airport) => {
    setTo(airport);
    setTimeout(() => setToResults([]), 0);
  };
  const airplaneRef = useRef();

  const handleSearchTrip = (e) => {
    const date = new Date();
    const formattedDate = date.toISOString().split("T")[0];
    const formattedReturnDate = returnDate
      ? new Date(returnDate).toISOString().split("T")[0]
      : null;

    const skyInfo = {
      date: formattedDate,
      cabinClass: flightClass.toLowerCase(), // Convert to lowercase
      currency: "USD",
      adults: adults,
      returnDate: formattedReturnDate,
      originSkyId: from.navigation.relevantFlightParams.skyId,
      destinationSkyId: to.navigation.relevantFlightParams.skyId,
      originEntityId: from.navigation.relevantFlightParams.entityId,
      destinationEntityId: to.navigation.relevantFlightParams.entityId,
    };
    console.log(skyInfo);
    e.preventDefault();

    axiosClient
      .get("/flights/searchFlights", { params: skyInfo })
      .then((response) => {
        console.log(response.data.data);
        setFlightsInfo(response.data.data.itineraries);
      })
      .catch(() => {
        setFlightsInfo(null);
      });
  };

  return (
    <>
      {!info && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="mt-6 bg-black bg-opacity-80 p-6 rounded-xl shadow-2xl w-full max-w-2xl mx-auto"
        >
          <h2 className="text-2xl font-semibold  text-center text-white mb-6">
            Find Your Flight ✈️
          </h2>

          <div className="flex flex-col md:flex-row gap-4">
            {/* From Input */}
            <div className="relative flex-1">
              <label className="text-white text-sm mb-1 block">From</label>
              <input
                type="text"
                className="w-full p-3 rounded-lg bg-gray-900 text-white border border-gray-700"
                placeholder="Enter departure city or airport..."
                value={from?.presentation?.title || from}
                onChange={(e) => {
                  setFrom(e.target.value);
                  fetchAirports(e.target.value, setFromResults);
                }}
              />
              {fromResults.length > 0 && (
                <ul className="absolute w-full bg-gray-800 text-white rounded-lg mt-1 shadow-lg z-10">
                  {fromResults.map((airport, index) => (
                    <li
                      key={index}
                      className="p-3 hover:bg-gray-700 cursor-pointer"
                      onClick={() => handleSelectFrom(airport)}
                    >
                      {airport.presentation?.title} ({airport.skyId})
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* To Input */}
            <div className="relative flex-1">
              <label className="text-white text-sm mb-1 block">To</label>
              <input
                type="text"
                className="w-full p-3 rounded-lg bg-gray-900 text-white border border-gray-700"
                placeholder="Enter destination city or airport..."
                value={to?.presentation?.title || to}
                onChange={(e) => {
                  setTo(e.target.value);
                  fetchAirports(e.target.value, setToResults);
                }}
              />
              {toResults.length > 0 && (
                <ul className="absolute w-full bg-gray-800 text-white rounded-lg mt-1 shadow-lg z-10">
                  {toResults.map((airport, index) => (
                    <li
                      key={index}
                      className="p-3 hover:bg-gray-700 cursor-pointer"
                      onClick={() => handleSelectTo(airport)}
                    >
                      {airport.presentation?.title} ({airport.skyId})
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {/* Departure Date */}
          <div className="mt-4">
            <label className="text-white text-sm mb-1 block ">
              Departure Date
            </label>
            <Calendar
              value={date}
              onChange={(e) => setDate(e.value)}
              showIcon
              dateFormat="m/d/yy"
              className="w-full md:p-3"
            />
          </div>
          <div className="">
            <label className="text-white text-sm mb-1 block ">
              Return Date
            </label>
            <Calendar
              value={returnDate}
              onChange={(e) => setreturnDate(e.value)}
              showIcon
              dateFormat="m/d/yy"
              className="w-full md:p-3"
            />
          </div>

          {/* Passenger Selection */}
          <div className="mt-4 flex flex-col md:flex-row gap-4">
            {/* Adults */}
            <div className="flex-1">
              <label className="text-white text-sm mb-1 block">Adults</label>
              <input
                type="number"
                className="w-full p-3 rounded-lg bg-gray-900 text-white border border-gray-700"
                min="1"
                value={adults}
                onChange={(e) => setAdults(Math.max(1, e.target.value))}
              />
            </div>

            {/* Children */}
            <div className="flex-1">
              <label className="text-white text-sm mb-1 block">Children</label>
              <input
                type="number"
                className="w-full p-3 rounded-lg bg-gray-900 text-white border border-gray-700"
                min="0"
                value={children}
                onChange={(e) => setChildren(Math.max(0, e.target.value))}
              />
            </div>

            {/* Infants */}
            <div className="flex-1">
              <label className="text-white text-sm mb-1 block">Infants</label>
              <input
                type="number"
                className="w-full p-3 rounded-lg bg-gray-900 text-white border border-gray-700"
                min="0"
                value={infants}
                onChange={(e) => setInfants(Math.max(0, e.target.value))}
              />
            </div>
          </div>

          {/* Flight Class */}
          <div className="mt-4">
            <label className="text-white text-sm mb-1 block">Class</label>
            <select
              className="w-full p-3 rounded-lg bg-gray-900 text-white border border-gray-700"
              value={flightClass}
              onChange={(e) => setFlightClass(e.target.value)}
            >
              <option value="economy">economy</option>
              <option value="premium_economy">premium_economy</option>
              <option value="business">business</option>
              <option value="first">first class</option>
            </select>
          </div>

          {/* Search Button */}
          <motion.button
            onClick={(e) => handleSearchTrip(e)}
            whileTap={{ scale: 0.95 }}
            className="w-full bg-[#081744] hover:bg-blue-500 transition-all text-white font-bold py-3 mt-6 rounded-lg"
          >
            {loading ? "Searching..." : "Search Flights"}
          </motion.button>
        </motion.div>
      )}
      <div className="mt-3">
        {/* Display Flight Info */}
        {info && <FlightList flights={info} />}
      </div>
      <div className="relative w-full min-h-screen pt-4 overflow-x-hidden bg-gradient-to-b  text-white">
        {!info && (
          <div className="h-screen mt-[-100px] z-99">
            <Canvas camera={{ position: [5, 2, 10], fov: 50 }}>
              {/* Lighting */}
              <ambientLight intensity={0.5} />
              <spotLight position={[0, 5, 5]} angle={0.3} intensity={2} />

              {/* Camera follows the airplane */}
              <CameraFollow target={airplaneRef} />

              {/* Airplane Model */}
              <Suspense fallback={null}>
                <Airplane ref={airplaneRef} />
              </Suspense>

              {/* Smooth controls */}
              <OrbitControls />
            </Canvas>
          </div>
        )}
      </div>
    </>
  );
}
