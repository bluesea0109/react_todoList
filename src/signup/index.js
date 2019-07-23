import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'
import { connect } from 'react-redux'

import signupRequest from './actions'

class Signup extends Component {
	render() {
		return (
			<div className="signup">
				<form className="widget-form">
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