import React, { Component } from 'react';
import { connect } from "react-redux";
import Spinner from "../../util/Spinner";
import { Link } from "react-router-dom";
import { currentProfileAction, deleteProfileAction } from "../../actions/profileActions";
import ProfileActions from "./ProfileActions";

class Dashboard extends Component {
	componentDidMount(){
		this.props.currentProfileAction();
	}

	onDeleteClick = () =>{
		this.props.deleteProfileAction();
	}

	render() {
		let dashboardContent;
		const { user } = this.props.auth;
		const { profile, loading } = this.props.profile;
		
		if(profile === null || loading){
			dashboardContent = <Spinner />
		} else{
			// check if logged in user has a profile
			if(Object.keys(profile).length > 0){
				dashboardContent = (
					<div>
						<p className="lead text-muted">Welcome <Link to={`/profile/${profile.handle}`}>{user.name}</Link>,</p>
						<ProfileActions />
						<div style={{marginBottom: "60px"}}></div>
						<button onClick={this.onDeleteClick} className="btn btn-danger">Delete Account</button>
					</div>
				);
			} else{
				//user is logged in but has no profile
				dashboardContent = (
					<div>
						<p className="lead text-muted">Welcome {user.name},</p>
						<p>You have not yet setup a profile, please add some info.</p>
						<Link to="/profile/new" className="btn btn-info btn-lg">Create Profile</Link>
					</div>
				)
			}
		}

		return (
			<div className="dashboard">
				<div className="container">
					<div className="row">
						<div className="col-md-12">
							<h1 className="display-4">Dashboard</h1>
							{dashboardContent}
						</div>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) =>({
	profile: state.profile,
	auth: state.auth
});

export default connect(mapStateToProps, { currentProfileAction, deleteProfileAction })(Dashboard);