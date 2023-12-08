import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const initialState = {
  url: "fcc9d3bec80fc242e40e766785817743",
  selectCity: [
    {
      country: "ua",
      city: "Kharkiv",
    },
    {
      country: "ua",
      city: "Kiev",
    },
    {
      country: "uk",
      city: "London",
    },
    {
      country: "fr",
      city: "Paris",
    },
    {
      country: "ua",
      city: "Lviv",
    },
    {
      country: "ca",
      city: "Toronto",
    },
    {
      country: "ae",
      city: "Dubai",
    },
    {
      country: "us",
      city: "Miami",
    },
  ],
  current: [
    {
      country: "ua",
      city: "Kharkiv",
    },
  ],
  weather: {
    id: "",
    main: "",
    description: "",
    humidity: "",
    temp: "",
    wind: "",
  },
  example: [],
  history: [],
  count: 0,
  fetchExp: "fetchExp",
  currentLanguage: "us",
};

// const jsonPlaceholder = "https://jsonplaceholder.typicode.com/todos";
// const fetchCurrent = `https://api.openweathermap.org/data/2.5/weather?q=${initialState.current[0].city},${initialState.current[0].country}&appid=${initialState.url}`;
// const fetchSelect = `https://api.openweathermap.org/data/2.5/weather?q=${
//   initialState.selectCity[initialState.count].city
// },${initialState.selectCity[initialState.count].country}&appid=${
//   initialState.url
// }`;
// const zapros = `https://api.openweathermap.org/data/2.5/weather?q=Kharkiv,ua&appid=fcc9d3bec80fc242e40e766785817743`;

export const fetchData = createAsyncThunk(
  "weatherReducer/fetchData",
  async (fetchCurrent) => {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${fetchCurrent.city},${fetchCurrent.country}&appid=fcc9d3bec80fc242e40e766785817743`
    );
    const data = await response.json();
    return data;
  }
);

export const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {
    changeSelect: (state, action) => {
      let currentCity = action.payload;
      state.history = [currentCity, ...state.history];
      state.history.length === 9
        ? state.history.splice(8, 1)
        : (state.history = [...state.history]);
      state.current = state.selectCity.filter((element) => {
        return element.city === currentCity;
      });
    },
    onUsLanguage: (state) => {
      state.currentLanguage = "us";
    },
    onUaLanguage: (state) => {
      state.currentLanguage = "ua";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchData.fulfilled, (state, action) => {
      state.weather.wind = action.payload.wind.speed;
      state.weather.temp = action.payload.main.temp_min;
      state.weather.humidity = action.payload.main.humidity;
      state.weather.id = action.payload.weather[0].id;
      state.weather.main = action.payload.weather[0].main;
      state.weather.description = action.payload.weather[0].description;
      console.log("extraReducers action : ", action.payload);
    });
  },
});

export const {
  optionClick,
  optionChange,
  buttonClick,
  onUsLanguage,
  onUaLanguage,
  changeSelect,
} = weatherSlice.actions;
export default weatherSlice.reducer;
