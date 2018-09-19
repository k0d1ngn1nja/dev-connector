import axios from "axios";
import { GET_PROFILE, PROFILE_LOADING, CLEAR_CURRENT_PROFILE, GET_ERRORS } from "./types";

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

// create profile
export const createProfileAction = (profileData, history) => (dispatch) =>{
	axios.post("/api/profile", profileData)
		.then(res => history.push("/dashboard"))
		.catch(err => dispatch({
			type: GET_ERRORS,
			payload: err.response.data
		}));
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