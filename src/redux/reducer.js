import * as actionType from "./actionTypes";

const initState = {
  placeList: [],
};

const rootReducer = (state = initState, action) => {
  switch (action.type) {
    case actionType.ADD_PLACE: {
      return {
        ...state,
        placeList: state.placeList.concat(action.payload),
      };
    }
    case actionType.REMOVE_PLACE: {
      const newPlace = state.placeList.filter(
        (place) => place.key !== action.payload
      );
      return {
        ...state,
        placeList: newPlace,
      };
    }
    default:
      return state;
  }
};

export default rootReducer;
