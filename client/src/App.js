import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import jwt_decode from "jwt-decode";
import setAuthToken from "./util/setAuthToken";
import { setCurrentUserAction, logoutUserAction } from "./actions/authActions";
import { clearCurrentProfile } from "./actions/profileActions";
import Register from "./components/auth/register";
import Login from "./components/auth/login";
import Dashboard from "./components/dashboard/Dashboard";
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Footer from "./components/layout/Footer";
import CreateProfile from "./components/profile/createProfile";
import EditProfile from "./components/profile/EditProfile";
import PrivateRoute from "./util/privateRoute";

import './App.css';

// check for token
if(localStorage.jwtToken){
	// set auth token header auth
	setAuthToken(localStorage.jwtToken);
	// decode token and get user info 
	const decoded = jwt_decode(localStorage.jwtToken);
	// set user and isAuthenticated
	store.dispatch(setCurrentUserAction(decoded));

	// check for expired token
	const currentTime = Date.now() / 1000;
	if(decoded.exp < currentTime){
		// logout user
		store.dispatch(logoutUserAction());
		//clear profile from state
		store.dispatch(clearCurrentProfile());
		// redirect to login
		window.location.href = "/login";
	}
}

class App extends Component {
  render() {
    return (
    	<Provider store={store}>
	    	<Router>
		      <div className="App">
		      	<Navbar />
		       		<Route exact path="/" component={ Landing } />
		       		<div className="container">
								<Route exact path="/register" component={ Register } />
								<Route exact path="/login" component={ Login } />
								<Switch>
									<PrivateRoute exact path="/dashboard" component={ Dashboard } />
									<PrivateRoute exact path="/profile/new" component={ CreateProfile } />
									<PrivateRoute exact path="/edit-profile" component={ EditProfile } />
								</Switch>
		       		</div>
						<Footer />
		      </div>
		    </Router>
		  </Provider>
    );
  }
}

export default App;
