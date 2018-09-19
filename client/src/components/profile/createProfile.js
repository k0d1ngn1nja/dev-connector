import React, { Component } from 'react';
import { connect } from "react-redux";
import TextFieldGroup from "../layout/Form/TextFieldGroup";
import TextAreaField from "../layout/Form/TextAreaField";
import SelectListGroup from "../layout/Form/SelectListGroup";
import InputGroupField from "../layout/Form/InputGroupField";

class CreateProfile extends Component {
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
			githubusername: "",
			bio: "",
			twitter: "",
			facebook: "",
			linkedin: "",
			youtube: "",
			instagram: "",
			errors: {}
		}
	}
	
	onChange = (e) =>{
		this.setState({
			[e.target.name]: e.target.value
		})
	}

	onFormSubmit = (e) =>{
		e.preventDefault();
		console.log("form submitted");
	}

	toggleSocialInputsView = () =>{
		this.setState(prevState =>({
			toggleSocialLinks: !prevState.toggleSocialLinks
		}))
	}
	render() {
		let displaySocialInputs;
		
		const {errors, toggleSocialLinks} = this.state;
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
						errors={errors.twitter}
						info="If you want your latest repos and a Github link, include your username"
					/>
					<InputGroupField 
						placeholder="facebook Profile URL"
						name="facebook"
						icon="fab fa-facebook"
						value={this.state.facebook}
						onChange={this.onChange}
						errors={errors.facebook}
					/>
					<InputGroupField 
						placeholder="Linkedin Profile URL"
						name="linkedin"
						icon="fab fa-linkedin"
						value={this.state.linkedin}
						onChange={this.onChange}
						errors={errors.linkedin}
					/>
					<InputGroupField 
						placeholder="instagram Profile URL"
						name="instagram"
						icon="fab fa-instagram"
						value={this.state.instagram}
						onChange={this.onChange}
						errors={errors.instagram}
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
							<h1 className="display-4 text-center">CreateYour Profile</h1>
							<p className="lead text-center">Please provide some information to make your profile standout</p>
							<small className="d-block pb-3">* = required fields</small>

							<form onSubmit={this.onFormSubmit}>
								<TextFieldGroup
									placeholder="* Profile Hanle"
									name="handle"
									value={this.state.handle}
									onChange={this.onChange}
									errors={errors.handle}
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
									errors={errors.company}
									info="A unique handle for your profile URL. Your full name, company name, nickname"
								/>
								<TextFieldGroup
									placeholder="Website"
									name="website"
									value={this.state.website}
									onChange={this.onChange}
									errors={errors.website}
									info="Could be your own or a company website"
								/>
								<TextFieldGroup
									placeholder="Location"
									name="location"
									value={this.state.location}
									onChange={this.onChange}
									errors={errors.location}
									info="City & state suggested (eg. Boston, MA)"
								/>
								<TextFieldGroup
									placeholder="Skills"
									name="skills"
									value={this.state.skills}
									onChange={this.onChange}
									errors={errors.skills}
									info="Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)"
								/>
								<TextFieldGroup
									placeholder="Github Username"
									name="githubusername"
									value={this.state.githubusername}
									onChange={this.onChange}
									errors={errors.githubusername}
									info="If you want your latest repos and a Github link, include your username"
								/>
								<TextAreaField
									placeholder="Short Bio"
									name="bio"
									value={this.state.bio}
									onChange={this.onChange}
									errors={errors.bio}
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
})

export default connect(mapStateToProps)(CreateProfile);