import * as actionType from "./actionTypes";

const initState = {
  placeList: [],
  isAuth: false,
  token: null,
  isLoading: false,
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
        (place) => place.id !== action.payload
      );
      return {
        ...state,
        placeList: newPlace,
      };
    }
    case actionType.FATCH_PLACE: {
      const places = [];
      for (const key in action.payload) {
        if (Object.hasOwnProperty.call(action.payload, key)) {
          const element = action.payload[key];
          places.push({
            ...element,
            id: key,
          });
        }
      }

      return {
        ...state,
        placeList: places,
      };
    }
    case actionType.AUTHENTICATE_USER: {
      return {
        ...state,
        isAuth: true,
        token: action.payload,
      };
    }
    case actionType.ISLOADING: {
      return {
        ...state,
        isLoading: action.payload,
      };
    }
    default:
      return state;
  }
};

export default rootReducer;
