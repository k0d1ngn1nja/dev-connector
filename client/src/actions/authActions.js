import { REGISTER_USER, GET_ERRORS } from "./types";
import axios from "axios";

export const registerUser = (userData, history) => (dispatch) => {
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


// axios.post("/api/register", newuser)
		// 	.then(res => console.log(res.data))
		// 	.catch(err => this.setState({errors: err.response.data}));