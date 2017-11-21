import React from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom';
import {Login as LoginEvent} from '../const/Events';

const Logout = (state) => {
	state.logout();
	return <Redirect to="/login" />;
};

export default connect(
	state    => ({}),
	dispatch => ({
		logout : () => dispatch({type : LoginEvent.logout})
	})
)(Logout);
