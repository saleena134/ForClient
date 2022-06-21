export const USER_CITY = 'USER_CITY';
export const NEW_CITY = 'NEW_CITY';

export const getCity = cityName => dispatch => {
  dispatch({
    type: USER_CITY,
    payload: cityName,
  });
};
export const getNewCity = newCityName => dispatch => {
  dispatch({
    type: NEW_CITY,
    payload: newCityName,
  });
};
