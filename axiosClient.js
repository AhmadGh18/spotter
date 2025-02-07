import axios from "axios";

const axiosClient = axios.create({
  baseURL: "https://sky-scrapper.p.rapidapi.com/api/v1",
  headers: {
    "x-rapidapi-key": import.meta.env.VITE_RAPIDAPI_KEY,
    "x-rapidapi-host": "sky-scrapper.p.rapidapi.com",
  },
  timeout: 10000,
});

// Request Interceptor
axiosClient.interceptors.request.use(
  (config) => {
    console.log(`📡 Request to: ${config.url}`);
    return config;
  },
  (error) => {
    console.error("❌ Request Error:", error);
    return Promise.reject(error);
  }
);

// Response Interceptor
axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error(
      "❌ API Response Error:",
      error.response?.data || error.message
    );
    return Promise.reject(error);
  }
);

export default axiosClient;
