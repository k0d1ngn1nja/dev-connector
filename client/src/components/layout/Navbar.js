import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logoutUserAction } from "../../actions/authActions";

class Navbar extends Component {
	onLogoutClick = (e) =>{
		e.preventDefault();
		this.props.logoutUserAction();
	}

	render() {
		const { isAuthenticated, user } = this.props.auth;

		const loggedInLinks = (
			<React.Fragment>
				<li className="nav-item">
	        <a className="nav-link" href="#!" onClick={this.onLogoutClick}>
	        	Logout
	        	<img src={user.avatar} alt={user.name} title="You must have a Gravatar linked to your email" style={{width: "25px", marginLeft: "5px"}} className="rounded-circle" />
	        </a>
	      </li>
      </React.Fragment>
		);

		const loggedOutLinks = (
			<React.Fragment>
	      <li className="nav-item">
	        <Link className="nav-link" to="/register">Sign Up</Link>
	      </li>
	      <li className="nav-item">
	        <Link className="nav-link" to="/login">Login</Link>
	      </li>
     </React.Fragment>
		);

		return (
			<nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
		    <div className="container">
		      <Link className="navbar-brand" to="/">DevConnector</Link>
		      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#mobile-nav">
		        <span className="navbar-toggler-icon"></span>
		      </button>

		      <div className="collapse navbar-collapse" id="mobile-nav">
		        <ul className="navbar-nav mr-auto">
		          <li className="nav-item">
		            <Link className="nav-link" to="/profiles"> Developers
		            </Link>
		          </li>
		        </ul>
						
						{isAuthenticated ? (<ul className="navbar-nav ml-auto">{loggedInLinks}</ul>) : (<ul className="navbar-nav ml-auto">{loggedOutLinks}</ul>)}		        
		      </div>
		    </div>
		  </nav>
		);
	}
}

Navbar.propTypes = {
	logoutUserAction: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) =>({
	auth: state.auth
});

export default connect(mapStateToProps, { logoutUserAction })(Navbar);