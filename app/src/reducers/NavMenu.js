import {Login, NavMenu} from '../const/Events'

const initialState = {
	routeTo   : '/',
	routeForm : '/',
	select    : 0
};

const navMenu = (state = initialState, action) => {
	// eslint-disable-next-line
	switch (action.type) {
		case NavMenu.goto :
			return {
				...state,
				routeForm : state.routeTo,
				...action.data
			};
		case NavMenu.clear :
			return {
				...state,
				routeForm : state.routeTo,
			};
		case Login.logout:
			return {
				...initialState
			}
	}

	return state;
};

export {navMenu};
