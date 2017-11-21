import AlertStatus from '../const/AlertStatus';
import {Alert} from '../const/Events';

const initialState = {
	status  : AlertStatus.OK,
	message : '',
	open    : false,
};

const alert = (state = initialState, action) => {
	// eslint-disable-next-line
	switch (action.type) {
		case Alert.show:
			return {
				...state,
				...action.data,
				open : true
			};
		case Alert.close:
			return {
				...initialState,
			};
	}

	return state;
};

export {alert};
