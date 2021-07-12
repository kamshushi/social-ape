import axios from "axios";
import {
  SET_USER,
  CLEAR_ERRORS,
  SET_ERRORS,
  LOADING_UI,
  SET_UNAUTHENTICATED,
  LOADING_USER,
} from "../actionTypes";

//login Action
export const loginUser = (userData, history) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .post(
      "https://europe-west1-socialape-d081e.cloudfunctions.net/api/login",
      userData
    )
    .then((res) => {
      console.log(res.data);
      setAuthorizationHeader(res.data.token);
      dispatch(getUserData());
      dispatch({ type: CLEAR_ERRORS });
      history.push("/");
    })
    .catch((error) => {
      dispatch({
        type: SET_ERRORS,
        payload: error.response.data,
      });
    });
};
//signup Action
export const signupUser = (newUserData, history) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .post(
      "https://europe-west1-socialape-d081e.cloudfunctions.net/api/signup",
      newUserData
    )
    .then((res) => {
      setAuthorizationHeader(res.data.token);
      dispatch(getUserData());
      dispatch({ type: CLEAR_ERRORS });
      history.push("/");
    })
    .catch((error) => {
      dispatch({
        type: SET_ERRORS,
        payload: error.response.data,
      });
    });
};
//logout action
export const logoutUser = () => (dispatch) => {
  localStorage.removeItem("FBIdToken");
  delete axios.defaults.headers.common["Authorization"];
  dispatch({ type: SET_UNAUTHENTICATED });
};

//fetching the user data with the token automatically in the headers
export const getUserData = () => (dispatch) => {
  dispatch({
    type: LOADING_USER,
  });
  axios
    .get("/user")
    .then((res) => {
      dispatch({
        type: SET_USER,
        payload: res.data,
      });
    })
    .catch((error) => console.log(error));
};

export const uploadImage = (formData) => (dispatch) => {
  dispatch({ type: LOADING_USER });
  axios
    .post("/user/image", formData)
    .then((res) => {
      dispatch(getUserData());
    })
    .catch((err) => console.log(err));
};

export const editUserDetails = (userDetails) => (dispatch) => {
  dispatch({ type: LOADING_USER });
  axios
    .post("/user", userDetails)
    .then(() => {
      dispatch(getUserData());
    })
    .catch((err) => console.log(err));
};

const setAuthorizationHeader = (token) => {
  const FBIdToken = `Bearer ${token}`;
  localStorage.setItem("FBIdToken", FBIdToken);
  //To attach the token in the headers in every request automatically(This will send the token to every request even the unprotected routes, which is not a problem)
  axios.defaults.headers.common["Authorization"] = FBIdToken;
};
