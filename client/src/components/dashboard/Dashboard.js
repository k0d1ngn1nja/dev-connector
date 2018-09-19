import React, { Component } from 'react';
import { connect } from "react-redux";
import { currentProfileAction } from "../../actions/profileActions";

class Dashboard extends Component {
	componentDidMount(){
		this.props.currentProfileAction();
	}

	render() {
		return (
			<div>
				<h1>Dashboard</h1>
			</div>
		);
	}
}

export default connect(null, {currentProfileAction})(Dashboard);