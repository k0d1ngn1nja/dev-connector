import React, { Component } from 'react';
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import TextFieldGroup from "../layout/Form/TextFieldGroup";
import TextAreaField from "../layout/Form/TextAreaField";
import SelectListGroup from "../layout/Form/SelectListGroup";
import InputGroupField from "../layout/Form/InputGroupField";
import { createProfileAction, currentProfileAction } from "../../actions/profileActions";
import { isEmpty } from "../../util/helpers";

class EditProfile extends Component {
	constructor(props){
		super(props);
		this.state = {
			toggleSocialLinks: false,
			handle: "",
			company: "",
			website: "",
			location: "",
			status: "",
			skills: "",
			githubid: "",
			bio: "",
			twitter: "",
			facebook: "",
			linkedin: "",
			youtube: "",
			instagram: "",
			errors: {}
		}
	}

	componentDidMount(){
		this.props.currentProfileAction();
	}
	
	componentWillReceiveProps(nextProps){
		if(nextProps.errors){
			this.setState({errors: nextProps.errors});
		}

		if(nextProps.profile.profile){
			const profile = nextProps.profile.profile;

			// tranform skills array back to csv
			const skillsCSV = profile.skills.join(",");

			// if profile field is empty, convert it to string
			profile.company = !isEmpty(profile.company) ? profile.company : "";
			profile.website = !isEmpty(profile.website) ? profile.website : "";
			profile.location = !isEmpty(profile.location) ? profile.location : "";
			profile.githubid = !isEmpty(profile.githubid) ? profile.githubid : "";
			profile.bio = !isEmpty(profile.bio) ? profile.bio : "";
			profile.social = !isEmpty(profile.social) ? profile.social : {};
			profile.twitter = !isEmpty(profile.social.twitter) ? profile.social.twitter : "";
			profile.facebook = !isEmpty(profile.social.facebook) ? profile.social.facebook : "";
			profile.linkedin = !isEmpty(profile.social.linkedin) ? profile.social.linkedin : "";
			profile.instagram = !isEmpty(profile.social.instagram) ? profile.social.instagram : "";

			// set component fields state
			this.setState({
				handle: profile.handle,
				company: profile.company,
				website: profile.website,
				location: profile.location,
				status: profile.status,
				skills: skillsCSV,
				githubid: profile.githubid,
				bio: profile.bio,
				twitter: profile.twitter,
				facebook: profile.facebook,
				linkedin: profile.linkedin,
				instagram: profile.instagram
			});
		}
	}

	onChange = (e) =>{
		this.setState({
			[e.target.name]: e.target.value
		});
	}

	onFormSubmit = (e) =>{
		e.preventDefault();
		const profileData = {
			handle: this.state.handle,
			company: this.state.company,
			website: this.state.website,
			location: this.state.location,
			status: this.state.status,
			skills: this.state.skills,
			githubid: this.state.githubid,
			bio: this.state.bio,
			twitter: this.state.twitter,
			facebook: this.state.facebook,
			linkedin: this.state.linkedin,
			instagram: this.state.instagram
		};
		
		this.props.createProfileAction(profileData, this.props.history);
	}

	toggleSocialInputsView = () =>{
		this.setState(prevState =>({
			toggleSocialLinks: !prevState.toggleSocialLinks
		}))
	}

	render() {
		const { errors, toggleSocialLinks } = this.state;
		let displaySocialInputs;
		const options = [
			{label: "* Select Profession Status", value: 0},
			{label: "Junior Developer", value: "Junior Developer"},
			{label: "Senior Developer", value: "Senior Developer"},
			{label: "Manager", value: "Manager"},
			{label: "Intern", value: "Intern"},
			{label: "Student", value: "Student"},
			{label: "Other", value: "Other"}
		];

		if(toggleSocialLinks){
			displaySocialInputs = (
				<React.Fragment>
					<InputGroupField 
						placeholder="Twitter Profile URL"
						name="twitter"
						icon="fab fa-twitter"
						value={this.state.twitter}
						onChange={this.onChange}
						error={errors.twitter}
						info="If you want your latest repos and a Github link, include your username"
					/>
					<InputGroupField 
						placeholder="facebook Profile URL"
						name="facebook"
						icon="fab fa-facebook"
						value={this.state.facebook}
						onChange={this.onChange}
						error={errors.facebook}
					/>
					<InputGroupField 
						placeholder="Linkedin Profile URL"
						name="linkedin"
						icon="fab fa-linkedin"
						value={this.state.linkedin}
						onChange={this.onChange}
						error={errors.linkedin}
					/>
					<InputGroupField 
						placeholder="instagram Profile URL"
						name="instagram"
						icon="fab fa-instagram"
						value={this.state.instagram}
						onChange={this.onChange}
						error={errors.instagram}
						info="If you want your latest repos and a Github link, include your username"
					/>
				</React.Fragment>
			)
		}

		return (
			<div className="create-profile">
				<div className="container">
					<div className="row">
						<div className="col-md-8 md-auto">
							<h1 className="display-4 text-center">Edit Profile</h1>
							<small className="d-block pb-3">* = required fields</small>

							<form onSubmit={this.onFormSubmit}>
								<TextFieldGroup
									placeholder="* Profile Handle"
									name="handle"
									value={this.state.handle}
									onChange={this.onChange}
									error={errors.handle}
									info="A unique handle for your profile URL. Your full name, company name, nickname"
								/>
								<SelectListGroup 
									options={options} 
									placeholder="Status" 
									name="status" 
									value={this.state.status}
									onChange={this.onChange}
									error={errors.status}
									info="Give us an idea of where you are at in your career"
								/>
								<TextFieldGroup
									placeholder="Company"
									name="company"
									value={this.state.company}
									onChange={this.onChange}
									error={errors.company}
									info="A unique handle for your profile URL. Your full name, company name, nickname"
								/>
								<TextFieldGroup
									placeholder="Website"
									name="website"
									value={this.state.website}
									onChange={this.onChange}
									error={errors.website}
									info="Could be your own or a company website"
								/>
								<TextFieldGroup
									placeholder="Location"
									name="location"
									value={this.state.location}
									onChange={this.onChange}
									error={errors.location}
									info="City & state suggested (eg. Boston, MA)"
								/>
								<TextFieldGroup
									placeholder="Skills"
									name="skills"
									value={this.state.skills}
									onChange={this.onChange}
									error={errors.skills}
									info="Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)"
								/>
								<TextFieldGroup
									placeholder="Github Username"
									name="githubid"
									value={this.state.githubid}
									onChange={this.onChange}
									error={errors.githubid}
									info="If you want your latest repos and a Github link, include your username"
								/>
								<TextAreaField
									placeholder="Short Bio"
									name="bio"
									value={this.state.bio}
									onChange={this.onChange}
									error={errors.bio}
									info="Tell us a little about yourself"
								/>

								<div className="mb-3">
									<button className="btn btn-light" onClick={this.toggleSocialInputsView}>
										Add Social Network Links
									</button>
									<span className="text-muted">Optional</span>
								</div>

								{displaySocialInputs}

								<input type="submit" value="Submit" className="btn btn-info btn-block mt-4"/>
							</form>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) =>({
	profile: state.profile,
	errors: state.errors
});

export default connect(mapStateToProps, {createProfileAction, currentProfileAction})(EditProfile);