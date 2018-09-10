const Validator = require("validator");

const isEmpty = (value) =>(
	value === undefined || value === null || (typeof value === "object" && Object.keys(value).length === 0) || (typeof value === "string" && value.trim().length === 0)
);

const validateSocialLinks = (data, socialtype) =>{
	if(!isEmpty(data.smtype)){
		if(!Validator.isURL(data.socialtype)){
			errors.socialtype = "Not a valid URL";
		}
	}	
};

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
	},

	profileInput: (data) =>{
		let errors = {};

		data.handle = !isEmpty(data.handle) ? data.handle : "";
		data.status = !isEmpty(data.status) ? data.status : "";
		data.skills = !isEmpty(data.skills) ? data.skills : "";
		
		if(!Validator.isLength(data.handle, {min: 2, max: 25})){
			errors.handle = "Handle needs to between 2 and 25 characters.";
		}

		if(Validator.isEmpty(data.handle)){
			errors.handle = "Profile handle is required.";
		}
		
		if(Validator.isEmpty(data.status)){
			errors.status = "Status field is required.";
		}
		
		if(Validator.isEmpty(data.skills)){
			errors.skills = "Skills field is required.";
		}

		if(!isEmpty(data.website)){
			if(!Validator.isURL(data.website)){
				errors.website = "Not a valid URL";
			}
		}

		return{
			errors,
			isValid: isEmpty(errors)
		}
	},

	experienceInput: (data) =>{
		let errors = {};
		
		// required fields
		data.title = !isEmpty(data.title) ? data.title : "";
		data.company = !isEmpty(data.company) ? data.company : "";
		data.startDate = !isEmpty(data.startDate) ? data.startDate : "";
		
		if(Validator.isEmpty(data.title)){
			errors.title = "Job Title field is required.";
		}

		if(Validator.isEmpty(data.company)){
			errors.company = "Company name field is required.";
		}

		if(Validator.isEmpty(data.startDate)){
			errors.startDate = "Start date field is required.";
		}

		return{
			errors,
			isValid: isEmpty(errors)
		}
	},

	educationInput: (req, res, next) =>{
		let errors = {};
		
		// required fields
		data.school = !isEmpty(data.school) ? data.school : "";
		data.degree = !isEmpty(data.degree) ? data.degree : "";
		data.fieldofstudy = !isEmpty(data.fieldofstudy) ? data.fieldofstudy : "";
		data.startDate = !isEmpty(data.startDate) ? data.startDate : "";

		if(Validator.isEmpty(data.school)){
			errors.school = "School name is required.";
		}

		if(Validator.isEmpty(data.degree)){
			errors.degree = "Degree field is required.";
		}

		if(Validator.isEmpty(data.fieldofstudy)){
			errors.fieldofstudy = "Field of Study is required.";
		}

		if(Validator.isEmpty(data.startDate)){
			errors.startDate = "Start date field is required.";
		}

		return{
			errors,
			isValid: isEmpty(errors)
		}		
	},

	postIput: (req, res, next) =>{
		let errors = {};
		
		// required fields
		data.text = !isEmpty(data.text) ? data.school : "";

		if(!Validator.isLength(data.text, {min: 10, max: 300})){
			errors.text = "Post must be between 10 and 300 characters";
		}
		
		if(Validator.isEmpty(data.text)){
			errors.text = "Text field is required";
		}
	}
}