import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// 1. Thunk completely rewritten with clean async/await (NO .then or .catch)
export const fetchWeather = createAsyncThunk(
  "weatherApi/fetchWeather",
  async ({ city = "Egypt", lang = "ar" } = {}, { signal }) => {
    const response = await axios.get(
      `https://api.weatherapi.com/v1/forecast.json?key=345da89c6ee741fabcb162818262705&q=${city}&days=1&aqi=no&alerts=no`,
      { signal },
    );

    // Grab the first day of the forecast safely
    const forecastDay = response.data.forecast.forecastday[0].day;

    // Return the cleaned payload data directly
    return {
      number: Math.round(response.data.current.temp_c),
      min: Math.round(forecastDay.mintemp_c),
      max: Math.round(forecastDay.maxtemp_c),
      description: response.data.current.condition.text,
      icon: `https:${response.data.current.condition.icon}`,
    };
  },
);

const weatherApiSlice = createSlice({
  name: "weatherApi",
  initialState: {
    data: null, // Stores weather data once loaded
    isLoading: false, // Tracks the API loading state
    error: null, // Tracks network or API errors
  },
  reducers: {
    changeResult: (state) => {
      state.data = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Triggers when the API request starts
      .addCase(fetchWeather.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      // Triggers when the API request finishes successfully
      .addCase(fetchWeather.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      // Triggers if the request fails or is aborted (Handles error catching automatically)
      .addCase(fetchWeather.rejected, (state, action) => {
        state.isLoading = false;
        if (action.error.name !== "AbortError") {
          state.error = action.error.message || "Failed to fetch weather";
        }
      });
  },
});

export const { changeResult } = weatherApiSlice.actions;
export default weatherApiSlice.reducer;
