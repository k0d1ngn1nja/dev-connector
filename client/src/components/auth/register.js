import React, { Component } from 'react';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUserAction } from "../../actions/authActions";
import { withRouter } from "react-router-dom";
import TextFieldGroup from "../layout/Form/TextFieldGroup";

class Register extends Component {
	state = {
		name: "",
		email: "",
		password: "",
		password2: "",
		errors: {}
	}
	
	componentDidMount(){
		if(this.props.auth.isAuthenticated){
			this.props.history.push("/dashboard");
		}
	}
	
	onInputChange = (e) =>{
		this.setState({[e.target.name]: e.target.value});
	}
	
	onSubmitSignupForm = (e) =>{
		e.preventDefault();
		const newuser = {
			name: this.state.name,
			email: this.state.email,
			password: this.state.password,
			password2: this.state.password2,
		};
		
		this.props.registerUserAction(newuser, this.props.history);
	}

	componentWillReceiveProps(nextProps){
		if(nextProps.errors){
			this.setState({errors: nextProps.errors});
		}
	}

	render() {
		const { errors } = this.state;

		return (
			<div className="register">
		    <div className="container">
		      <div className="row">
		        <div className="col-md-8 m-auto">
		          <h1 className="display-4 text-center">Sign Up</h1>
		          <p className="lead text-center">Create your DevConnector account</p>
		          <form noValidate onSubmit={this.onSubmitSignupForm}>
		          	<TextFieldGroup
		          		error={errors.name}
		          		name="name"
	              	onChange={this.onInputChange}
	              	value={this.state.name}
	              	placeholder="Enter Name" 
		          	/>

		          	<TextFieldGroup
		          		error={errors.email}
		          		name="email"
		          		type="email"
	              	onChange={this.onInputChange}
	              	value={this.state.email}
	              	placeholder="Enter Email" 
	              	info="This site uses Gravatar so if you want a profile image, use a Gravatar email"
		          	/>

		          	<TextFieldGroup
		          		error={errors.password}
		          		name="password"
		          		type="password"
	              	onChange={this.onInputChange}
	              	value={this.state.password}
	              	placeholder="Enter Password"
		          	/>

		          	<TextFieldGroup
		          		error={errors.password2}
		          		name="password2"
		          		type="password"
	              	onChange={this.onInputChange}
	              	value={this.state.password2}
	              	placeholder="Enter Password Confirmation"
		          	/>
		            
		            <input type="submit" className="btn btn-info btn-block mt-4" />
		          </form>
		        </div>
		      </div>
		    </div>
		  </div>
		);
	}
}

Register.propTypes = {
	registerUser: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired
};

const mapStateToProps = state =>({
	auth: state.auth,
	errors: state.errors
});

export default connect(mapStateToProps, { registerUserAction })(withRouter(Register));