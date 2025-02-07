import { Canvas } from "@react-three/fiber";
import { FlyControls, OrbitControls } from "@react-three/drei";
import { Suspense, useEffect, useRef } from "react";
import Airplane from "./Airplane";
import Loader from "./Loader";
import FlightSearch from "./FlightSearch";
import { motion } from "framer-motion";
import axiosClient from "../axiosClient";
import CameraFollow from "./CameraFllow";

export default function App() {
  return (
    <div className="relative w-full min-h-screen pt-4 overflow-x-hidden bg-gradient-to-b from-black to-blue-900 text-white">
      {/* 3D Airplane Scene */}

      {/* Flight Search Section with Animation */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative z-10 flex flex-col items-center justify-center h-full text-center"
      >
        <h1 className="text-4xl md:text-6xl font-bold uppercase tracking-wider drop-shadow-lg">
          Flight Tracker
        </h1>

        {/* Flight Search Component */}
        <FlightSearch />
      </motion.div>
    </div>
  );
}
