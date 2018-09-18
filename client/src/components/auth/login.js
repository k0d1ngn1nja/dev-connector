import React, { Component } from 'react';
import PropTypes from "prop-types";
import classnames from "classnames";
import { connect } from "react-redux";
import { loginUserAction } from "../../actions/authActions";

class Login extends Component {
	state = {
		email: "",
		password: "",
		errors: {}
	}

	componentDidMount(){
		if(this.props.auth.isAuthenticated){
			this.props.history.push("/dashboard");
		}
	}
	
	componentWillReceiveProps(nextProps){
		if(nextProps.auth.isAuthenticated){
			this.props.history.push("/dashboard");
		}

		if(nextProps.errors){
			this.setState({errors: nextProps.errors});
		}
	}

	onInputChange = (e) =>{
		this.setState({[e.target.name]: e.target.value});
	}

	onSubmitLoginForm = (e) =>{
		e.preventDefault();
		const userData = {
			email: this.state.email,
			password: this.state.password
		};
		
		this.props.loginUserAction(userData);
	}

	render() {
		const {errors} = this.state;

		return (
			<div className="login">
		    <div className="container">
		      <div className="row">
		        <div className="col-md-8 m-auto">
		          <h1 className="display-4 text-center">Log In</h1>
		          <p className="lead text-center">Sign in to your DevConnector account</p>
		          <form onSubmit={this.onSubmitLoginForm}>
		            <div className="form-group">
		              <input 
		              	type="email" 
		              	value={this.state.email}
		              	onChange={this.onInputChange}
		              	className="form-control form-control-lg" 
		              	placeholder="Email Address" name="email" 
		              	className={classnames("form-control form-control-lg", {
		              		"is-invalid": errors.email
		              	})}
		              />
		              {errors.email && (
		              	<div className="invalid-feedback">{errors.email}</div>
		              )}
		            </div>
		            <div className="form-group">
		              <input 
		              	type="password" 
		              	value={this.state.password}
		              	onChange={this.onInputChange}
		              	className="form-control form-control-lg" 
		              	placeholder="Password" name="password"
		              	className={classnames("form-control form-control-lg", {
		              		"is-invalid": errors.password
		              	})}
		              />
		              {errors.password && (
		              	<div className="invalid-feedback">{errors.password}</div>
		              )}
		            </div>
		            <input type="submit" className="btn btn-info btn-block mt-4" />
		          </form>
		        </div>
		      </div>
		    </div>
		  </div>
		);
	}
}

Login.propTypes = {
	loginUser: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired
};

const mapStateToProps = (state) =>({
	auth: state.auth,
	errors: state.errors
});

export default connect(mapStateToProps, { loginUserAction })(Login);