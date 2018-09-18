import axios from "axios";
import jwt_decode from "jwt-decode";
import setAuthToken from "../util/setAuthToken";
import { REGISTER_USER, GET_ERRORS, SET_CURRENT_USER } from "./types";

export const registerUserAction = (userData, history) => (dispatch) => {
	axios.post("/api/register", userData)
		.then(res => history.push("/login"))
		.catch(err =>
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data
			})
		);

	return{
		type: REGISTER_USER,
		payload: userData
	}
};

export const loginUserAction = (userData) => (dispatch) =>{
	axios.post("/api/login", userData)
		.then(res =>{
			const { token } = res.data;
			localStorage.setItem("jwtToken", token);
			setAuthToken(token); //set token to auth header
			const decoded = jwt_decode(token); //decode token to get user data
			dispatch(setCurrentUserAction(decoded)); //set current user
		}).catch((err) =>
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data
			})
		);
}

// set logged in user
export const setCurrentUserAction = (decoded) =>{
	return{
		type: SET_CURRENT_USER,
		payload: decoded
	}
}

export const logoutUserAction = () => (dispatch) =>{
	// remove token from localstorage
	localStorage.removeItem("jwtToken");
	// remove auth header for future request
	setAuthToken(false);
	//set current user to {} which will also set isAunthenticated to false
	dispatch(setCurrentUserAction({}));
}