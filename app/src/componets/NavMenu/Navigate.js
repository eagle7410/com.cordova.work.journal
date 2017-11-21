import React from 'react';
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom';

const Navigate = (state) =>
	state.store.routeTo !== state.store.routeForm
		? <Redirect to={state.store.routeTo}/>
		: false;

export default connect(
	state => ({
		store: state.navMenu
	})
)(Navigate);
