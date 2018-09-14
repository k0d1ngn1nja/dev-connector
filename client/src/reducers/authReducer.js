import { REGISTER_USER, SET_CURRENT_USER } from "../actions/types";
import { isEmpty } from "../util/helpers";

const initialState = {
	isAuthenticated: false,
	user: {}
};

const authReducer = function(state = initialState, action){
	switch (action.type) {
		case REGISTER_USER:
			return {...state, user: action.payload};
		case SET_CURRENT_USER:
			return {...state, isAuthenticated: !isEmpty(action.payload), user: action.payload}
		default:
			return state;
	};
};

export default authReducer;