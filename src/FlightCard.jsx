import { motion } from "framer-motion";

const FlightCard = ({ flight }) => {
  const {
    price,
    legs: [
      { origin, destination, durationInMinutes, departure, arrival, carriers },
    ],
  } = flight;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.07, boxShadow: "0px 10px 20px rgba(0,0,0,0.2)" }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="bg-white p-5 rounded-xl shadow-md flex flex-col gap-3 w-full   border border-gray-300 hover:shadow-2xl transition-all md:w-[400px] cursor-pointer md:gap-0 md:mx-2 "
    >
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            {origin.city} → {destination.city}
          </h3>
          <p className="text-sm text-gray-600">
            {origin.displayCode} → {destination.displayCode}
          </p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-blue-600">{price.formatted}</p>
        </div>
      </div>

      {/* Airline Logo & Name */}
      <div className="flex items-center gap-4">
        <motion.img
          src={carriers.marketing[0].logoUrl}
          alt={carriers.marketing[0].name}
          className="w-12 h-12 object-contain"
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.2 }}
        />
        <p className="text-gray-800 font-medium">
          {carriers.marketing[0].name}
        </p>
      </div>

      {/* Flight Details */}
      <div className="text-sm text-gray-700 space-y-1">
        <p>
          🛫 <span className="font-bold">Departure:</span>{" "}
          {new Date(departure).toLocaleString()}
        </p>
        <p>
          🛬 <span className="font-bold">Arrival:</span>{" "}
          {new Date(arrival).toLocaleString()}
        </p>
        <p>
          ⏳ <span className="font-bold">Duration:</span>{" "}
          {Math.floor(durationInMinutes / 60)}h {durationInMinutes % 60}m
        </p>
      </div>
    </motion.div>
  );
};

export default FlightCard;
