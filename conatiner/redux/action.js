export const USER_CITY = "USER_CITY";
export const NEW_CITY = "NEW_CITY";
export const GET_LOCATION = "GET_LOCATION";

export const getCity = (cityName) => (dispatch) => {
  dispatch({
    type: USER_CITY,
    payload: cityName,
  });
};
export const getNewCity = (newCityName) => (dispatch) => {
  dispatch({
    type: NEW_CITY,
    payload: newCityName,
  });
};

export const getCurrentLocation = (takeLocation) => (dispatch) => {
  dispatch({
    type: GET_LOCATION,
    payload: takeLocation,
  });
};
