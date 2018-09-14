import { REGISTER_USER } from "./types";

export const registerUser = (user_data) =>{
	return{
		type: REGISTER_USER,
		payload: user_data
	}
};