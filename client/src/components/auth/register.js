import React, { Component } from 'react';
import axios from "axios";

class Register extends Component {
	state = {
		name: "",
		email: "",
		password: "",
		password2: "",
		errors: {}
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
		
		axios.post("/api/register", newuser).then(res => console.log(res.data)).catch(err => console.log(err.response.data));
	}

	render() {
		return (
			<div className="register">
		    <div className="container">
		      <div className="row">
		        <div className="col-md-8 m-auto">
		          <h1 className="display-4 text-center">Sign Up</h1>
		          <p className="lead text-center">Create your DevConnector account</p>
		          <form onSubmit={this.onSubmitSignupForm}>
		            <div className="form-group">
		              <input 
		              	type="text"
		              	onChange={this.onInputChange}
		              	value={this.state.name}
		              	className="form-control form-control-lg" 
		              	placeholder="Name" name="name" 
		              />
		            </div>
		            <div className="form-group">
		              <input 
		              	type="email" 
		              	value={this.state.email}
		              	onChange={this.onInputChange}
		              	className="form-control form-control-lg" 
		              	placeholder="Email Address" name="email" 
		              />
		              <small className="form-text text-muted">This site uses Gravatar so if you want a profile image, use a Gravatar email</small>
		            </div>
		            <div className="form-group">
		              <input 
		              	type="password" 
		              	value={this.state.password}
		              	onChange={this.onInputChange}
		              	className="form-control form-control-lg" 
		              	placeholder="Password" name="password" 
		              />
		            </div>
		            <div className="form-group">
		              <input 
		              	type="password" 
		              	value={this.state.password2}
		              	onChange={this.onInputChange}
		              	className="form-control form-control-lg" 
		              	placeholder="Confirm Password" name="password2" 
		              />
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

export default Register