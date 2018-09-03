const Validator = require("validator");

const isEmpty = (value) =>(
	value === undefined || value === null || (typeof value === "object" && Object.keys(value).length === 0) || (typeof value === "string" && value.trim().length === 0)
);

module.exports = {
	signupInput: (data) =>{
		let errors = {};
		data.name = !isEmpty(data.name) ? data.name : "";
		data.email = !isEmpty(data.email) ? data.email : "";
		data.password = !isEmpty(data.password) ? data.password : "";
		data.password2 = !isEmpty(data.password2) ? data.password2 : "";

		if(!Validator.isLength(data.name, {min: 2, max: 25})){
			errors.name = "Name must be between 2 and 25 characters";
		}

		if(Validator.isEmpty(data.name)){
			errors.name = "Name field is required";
		}
		
		if(Validator.isEmpty(data.email)){
			errors.email = "Email field is required";
		}

		if(!Validator.isEmail(data.email)){
			errors.email = "Email is invalid....";
		}

		if(Validator.isEmpty(data.password)){
			errors.password = "Password field is required";
		}

		if(!Validator.isLength(data.password, {min: 6, max: 25})){
			errors.password = "Password must be at least 6 characters";
		}
		
		if(Validator.isEmpty(data.password2)){
			errors.password2 = "Password Confirmation field is required";
		}

		if(!Validator.equals(data.password, data.password2)){
			errors.password2 = "Passwords must match";
		}

		return{
			errors,
			isValid: isEmpty(errors)
		}
	},

	loginInput: (data) =>{
		let errors = {};

		data.email = !isEmpty(data.email) ? data.email : "";
		data.password = !isEmpty(data.password) ? data.password : "";
		
		if(Validator.isEmpty(data.email)){
			errors.email = "Email field is required";
		}

		if(!Validator.isEmail(data.email)){
			errors.email = "Email is invalid....";
		}

		if(Validator.isEmpty(data.password)){
			errors.password = "Password field is required";
		}

		return{
			errors,
			isValid: isEmpty(errors)
		}
	}
}