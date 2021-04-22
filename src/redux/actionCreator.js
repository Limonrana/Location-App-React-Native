import * as actionType from "./actionTypes";

export const addPlace = (place) => {
  return {
    type: actionType.ADD_PLACE,
    payload: place,
  };
};
export const removePlace = (key) => {
  return {
    type: actionType.REMOVE_PLACE,
    payload: key,
  };
};
