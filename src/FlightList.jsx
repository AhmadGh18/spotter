// import ReactPaginate from "react-paginate";
// import FlightCard from "./FlightCard";
// import { useState } from "react";
// const FlightList = ({ flights }) => {
//   const [currentPage, setCurrentPage] = useState(0);
//   const flightsPerPage = 10;
//   const pageCount = Math.ceil(flights.length / flightsPerPage);

//   const handlePageClick = ({ selected }) => setCurrentPage(selected);
//   const paginatedFlights = flights.slice(
//     currentPage * flightsPerPage,
//     (currentPage + 1) * flightsPerPage
//   );

//   return (
//     <div className="p-4 ">
//       <h2 className="text-2xl font-bold text-center mb-4">Flight Results</h2>

//       <div className="flex flex-wrap w-full justify-center items-center gap-2 ">
//         {paginatedFlights.map((flight, index) => (
//           <FlightCard key={index} flight={flight} />
//         ))}
//       </div>

//       {/* Pagination */}
//       <ReactPaginate
//         previousLabel={"←"}
//         nextLabel={"→"}
//         pageCount={pageCount}
//         onPageChange={handlePageClick}
//         containerClassName={"flex justify-center mt-6 space-x-2"}
//         pageClassName={
//           "px-3 py-1 border rounded-lg cursor-pointer hover:bg-blue-100"
//         }
//         activeClassName={"bg-blue-500 text-white"}
//         previousClassName={
//           "px-3 py-1 border rounded-lg cursor-pointer hover:bg-gray-200"
//         }
//         nextClassName={
//           "px-3 py-1 border rounded-lg cursor-pointer hover:bg-gray-200"
//         }
//         disabledClassName={"opacity-50 cursor-not-allowed"}
//       />
//     </div>
//   );
// };

// export default FlightList;
import React, { useState, useMemo } from "react";
import ReactPaginate from "react-paginate";
import FlightCard from "./FlightCard";

const FlightList = ({ flights }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [sortOrder, setSortOrder] = useState(null);
  const flightsPerPage = 10;

  console.log("Incoming flights data:", flights); // Debugging

  // ✅ SORT Flights Before Paginating
  const sortedFlights = useMemo(() => {
    if (!flights || flights.length === 0) return [];

    let sorted = [...flights];

    if (sortOrder === "asc") sorted.sort((a, b) => a.price.raw - b.price.raw);
    if (sortOrder === "desc") sorted.sort((a, b) => b.price.raw - a.price.raw);

    console.log("Sorted flights:", sorted); // Debugging
    return sorted;
  }, [flights, sortOrder]);

  // ✅ PAGINATE Sorted Flights
  const pageCount = Math.ceil(sortedFlights.length / flightsPerPage);
  const paginatedFlights = useMemo(() => {
    const start = currentPage * flightsPerPage;
    return sortedFlights.slice(start, start + flightsPerPage);
  }, [sortedFlights, currentPage]);

  console.log("Paginated flights:", paginatedFlights); // Debugging

  // ✅ Handle Sorting
  const handleSort = (order) => {
    setSortOrder(order);
    setCurrentPage(0); // 🔥 Reset to first page after sorting
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold text-center mb-4">Flight Results</h2>

      {/* Sort Buttons */}
      <div className="flex justify-center gap-4 mb-4">
        <button
          className={`px-4 py-2 rounded-lg border ${
            sortOrder === "asc" ? "bg-blue-500 text-white" : "hover:bg-gray-200"
          }`}
          onClick={() => handleSort("asc")}
        >
          Price: Low to High
        </button>
        <button
          className={`px-4 py-2 rounded-lg border ${
            sortOrder === "desc"
              ? "bg-blue-500 text-white"
              : "hover:bg-gray-200"
          }`}
          onClick={() => handleSort("desc")}
        >
          Price: High to Low
        </button>
        <button
          className="px-4 py-2 rounded-lg border hover:bg-gray-200"
          onClick={() => handleSort(null)}
        >
          Reset Filters
        </button>
      </div>

      {/* Flight Cards */}
      <div className="flex flex-wrap justify-center gap-4">
        {paginatedFlights.length > 0 ? (
          paginatedFlights.map((flight, index) => (
            <FlightCard key={index} flight={flight} />
          ))
        ) : (
          <p className="text-center text-gray-500">No flights available.</p>
        )}
      </div>

      {/* Pagination */}
      {pageCount > 1 && (
        <ReactPaginate
          previousLabel={"←"}
          nextLabel={"→"}
          pageCount={pageCount}
          onPageChange={({ selected }) => setCurrentPage(selected)}
          containerClassName={"flex justify-center mt-6 space-x-2"}
          pageClassName={
            "px-3 py-1 border rounded-lg cursor-pointer hover:bg-blue-100"
          }
          activeClassName={"bg-blue-500 text-white"}
          previousClassName={
            "px-3 py-1 border rounded-lg cursor-pointer hover:bg-gray-200"
          }
          nextClassName={
            "px-3 py-1 border rounded-lg cursor-pointer hover:bg-gray-200"
          }
          disabledClassName={"opacity-50 cursor-not-allowed"}
        />
      )}
    </div>
  );
};

export default FlightList;
