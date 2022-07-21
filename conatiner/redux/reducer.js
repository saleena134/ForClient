import { DAILY_WEATHER, GET_LOCATION, NEW_CITY, USER_CITY } from "./action";

const initialstate = {
  cityName: [],
  newCityName: [],
  takeLocation: [],
};

export const reducer = (state = initialstate, action) => {
  switch (action.type) {
    case USER_CITY:
      return { ...state, cityName: action.payload };
    case NEW_CITY:
      return { ...state, newCityName: action.payload };
    case GET_LOCATION:
      return { ...state, takeLocation: action.payload };
    case DAILY_WEATHER:
      return { ...state, dailyWeather: action.payload };
    default:
      return state;
  }
};
