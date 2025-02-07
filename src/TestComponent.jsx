import React, { useState } from "react";
import axiosClient from "../axiosClient";

const TestComponent = () => {
  const [searchResults, setSearchResults] = useState([]);

  const fetchAirports = async (e) => {
    const query = e.target.value;
    if (!query) {
      setSearchResults([]);
      return;
    }

    try {
      const response = await axiosClient.get("/flights/searchAirport", {
        params: { query, locale: "en-US" },
      });

      console.log("API Response:", response.data);

      setSearchResults(response.data.data || []);
    } catch (error) {
      console.error("Error fetching airports:", error);
      setSearchResults([]);
    }
  };

  return (
    <div className="p-4">
      <input
        className="bg-white p-2 border border-gray-300 rounded-md w-full"
        type="text"
        placeholder="Search for an airport..."
        onChange={fetchAirports}
      />
      {searchResults.length > 0 && (
        <ul className="mt-2 bg-gray-800 text-white rounded-md">
          {searchResults.map((airport, index) => (
            <li key={index} className="p-3 hover:bg-gray-700 cursor-pointer">
              {airport.presentation?.title} ({airport.skyId})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TestComponent;
