import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { reduxForm, Field } from 'redux-form'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

// import the helpers.. that we'll make here in the next step
import Messages from '../notifications/Messages'
import Errors from '../notifications/Errors'

import signupRequest from './actions'

class Signup extends Component {

	static propTypes = {
		handleSubmit: PropTypes.func,
		signupRequest: PropTypes.func,
		signup: PropTypes.shape({
			requesting: PropTypes.bool,
			successful: PropTypes.bool,
			messages: PropTypes.array,
			errors: PropTypes.array,
		}),
	}

	submit = (values) => {
		this.props.signupRequest(values)
	}

	render() {
		const { 
			handleSubmit,
			signup: {
				requesting,
				successful,
				messages,
				errors,
			},
		} = this.props

		return (
			<div className="signup">
				<form className="widget-form" onSubmit={handleSubmit(this.submit)}>
					<h1>Signup</h1>
					<label htmlFor="email">Email</label>
					<Field 
						name="email"
						type="text"
						id="email"
						className="email"
						label="Email"
						component="input"
					/>
					<label htmlFor="password">Password</label>
					<Field
						name="password"
						type="password"
						id="password"
						className="password"
						label="Password"
						component="input"
					/>
					<button action="submit">SIGNUP</button>
				</form>
				<div className="auth-messages">
					{!requesting && !!errors.length && (
						<Errors message="Failure to signup due to:" errors={errors} />
					)}
					{!requesting && !!messages.length && (
						<Messages messages={messages} />
					)}
					{!requesting && successful && (
						<div>
							SIgnup Successful! <Link to="/login">Click here to Login..</Link>
						</div>
					)}
					{!requesting && !successful && (
						<Link to="/login">Already a Widgeter? Login Here..</Link>
					)}
				</div>
			</div>
		)
	}
}

// Grab only the piece of state we need
const mapStateToProps = state => ({
	signup: state.signup,
})

// Connect our component to redux and attach the 'signup'
// of state to our 'props' in the component. Also attach the
// 'signupRequest' action to our 'props' as well
const connected = connect(mapStateToProps, { signupRequest })(Signup)

// Connect our connected componendt to Redux Form. It will namespace
// the form we use in this component as 'signup'

const formed = reduxForm({
	form: 'signup',
})(connected)

export default formed