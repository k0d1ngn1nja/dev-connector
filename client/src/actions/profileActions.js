import axios from "axios";
import jwt_decode from "jwt-decode";
import setAuthToken from "../util/setAuthToken";
import { GET_PROFILE, PROFILE_LOADING, GET_ERRORS, CLEAR_CURRENT_PROFILE } from "./types";

// get current profile
export const currentProfileAction = () => (dispatch) =>{
	dispatch(setProfileLoading());
	axios.get("/api/profile").then((res) => dispatch({
		type: GET_PROFILE,
		payload: res.data
	})).catch(err => dispatch({
		type: GET_PROFILE,
		payload: {}
	}))
};

// profile loading
export const setProfileLoading = () =>{
	return{
		type: PROFILE_LOADING
	}
}

// clear current profile loading
export const clearCurrentProfile = () =>{
	return{
		type: CLEAR_CURRENT_PROFILE
	}
}