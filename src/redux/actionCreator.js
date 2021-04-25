import axios from "axios";
import * as actionType from "./actionTypes";
import { navigate } from "./navigationRoot";

// Add Place API Call and Dispatch
export const addPlace = (place) => (dispatch, getState) => {
  // Loading Action Dispatch True
  dispatch(isLoading(true));

  // API Call Start
  const token = getState().token;
  axios
    .post(
      `https://mobileapp-f8f08-default-rtdb.firebaseio.com/places.json?auth=${token}`,
      place
    )
    .then((res) => {
      // Loading Action Dispatch Fasle
      dispatch(isLoading(false));
      if (res) {
        navigate("Find Places");
        dispatch(addPlaceState(place));
      }
    })
    .catch((err) => {
      if (err) {
        // Loading Action Dispatch Fasle
        dispatch(isLoading(false));
        alert("OPPS! There was a server side problem");
      }
    });
};

// Fatch Place Action Creation
export const loadPlaces = (places) => {
  return {
    type: actionType.FATCH_PLACE,
    payload: places,
  };
};

// Failed Place Action Creation
export const failedFatchPlaces = () => {
  return {
    type: actionType.FAILED_FATCH_PLACE,
  };
};

// Fatch Place API Call and Dispatch
export const fatchPlace = () => (dispatch, getState) => {
  // Loading Action Dispatch True
  dispatch(isLoading(true));

  // API Call Start
  const token = getState().token;
  axios
    .get(
      `https://mobileapp-f8f08-default-rtdb.firebaseio.com/places.json?auth=${token}`
    )
    .then((res) => {
      // Loading Action Dispatch False
      dispatch(isLoading(false));
      dispatch(loadPlaces(res.data));
    })
    .catch((err) => {
      // Loading Action Dispatch False
      dispatch(isLoading(false));
      if (err) {
        dispatch(failedFatchPlaces());
      }
    });
};

// Add Place Action Creation
export const addPlaceState = (place) => {
  return {
    type: actionType.ADD_PLACE,
    payload: place,
  };
};

// Remove Place API Call and Dispatch
export const removePlace = (key) => (dispatch, getState) => {
  // Loading Action Dispatch True
  dispatch(isLoading(true));

  // API Call Start
  const token = getState().token;
  axios
    .delete(
      `https://mobileapp-f8f08-default-rtdb.firebaseio.com/places/${key}.json?auth=${token}`
    )
    .then((res) => {
      if (res) {
        // Loading Action Dispatch False
        dispatch(isLoading(false));
        dispatch(fetchAfterRemove(key));
      }
    })
    .catch((err) => {
      // Loading Action Dispatch False
      dispatch(isLoading(false));
      console.log(err.response);
    });
};

// Remove Place Action Creation
export const fetchAfterRemove = (key) => {
  return {
    type: actionType.REMOVE_PLACE,
    payload: key,
  };
};

// Loading Spinner Action Creator
export const isLoading = (isLoaded) => {
  return {
    type: actionType.ISLOADING,
    payload: isLoaded,
  };
};

/*
 * Section: Authentication Action
 * Description: All Authentication related action assign and export
 *
 */

// Signup and Login API Call on Firebase and Dispatch
export const tryAuth = (email, password, mode) => (dispatch) => {
  // Loading Action Dispatch True
  dispatch(isLoading(true));

  // API Call Start
  const API_KEY = "AIzaSyDMi331JZ4Rqyi22p4ixnKGSzglGMkIJto";
  let AUTH_URL = "";
  if (mode === "login") {
    AUTH_URL = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`;
  } else {
    AUTH_URL = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`;
  }
  const credenial = {
    email: email,
    password: password,
    returnSecureToken: true,
  };
  axios
    .post(AUTH_URL, credenial)
    .then((res) => {
      // Loading Action Dispatch False
      dispatch(isLoading(false));
      if (res.data) {
        navigate("MobileApp");
        dispatch(authenticateUser(res.data.idToken));
      }
    })
    .catch((err) => {
      // Loading Action Dispatch False
      dispatch(isLoading(false));
      if (err.response.data.error.message === "EMAIL_EXISTS") {
        alert("OPPS! Email already exist, please try with another one!");
      } else {
        alert(err.response.data.error.message);
      }
    });
};

// Authenticaion Check Action Creation
export const authenticateUser = (token) => {
  return {
    type: actionType.AUTHENTICATE_USER,
    payload: token,
  };
};
