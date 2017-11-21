import {Login} from '../const/Events'

const initialState = {
	pass       : false,
	list       : [],
	login      : false,
	token      : false,
	isAuth     : false,
	isLoad     : true,
	isLoaded   : false,
	errorPass  : '',
	errorLogin : ''
};

const login = (state = initialState, action) => {
	/* eslint-disable default-case */
	switch (action.type) {
		case Login.authTry:
			return {
				...state,
				errorPass: '',
				errorLogin: '',
			};
		case Login.authOK:
			return {
				...state,
				isAuth: true,
				token: action.data
			};
		case Login.authBad:
			return {
				...state,
				errorPass: action.data
			};
		case Login.validBad:
			return {
				...state,
				...action.data
			};
		case Login.logout:
			return {
				...state,
				login: false,
				pass: false,
				token: false,
				isAuth: false,
			};
		case Login.initOk:
			let newState = {
				...state,
				isLoad: false,
				isLoaded: true,
				list: action.data
			};

			if (newState.list.length === 1) {
				newState.login = newState.list[0];
			}

			return newState;

		case Login.dataChange:
			let data = {};
			data[action.data.type] = action.data.val;

			return {
				...state,
				...data
			};
	}

	return state;
};

export {login};
