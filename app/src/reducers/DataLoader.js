import {DataLoader} from '../const/Events'
const initialState = {
	isLoad : true,
	isOk   : false
};

const dataLoader = (state = initialState, action) => {
	// eslint-disable-next-line
	switch (action.type) {
		case DataLoader.ok:
			return {
				...state,
				isLoad : false,
				isOk   : true,
			};
		case DataLoader.bad:
			return {
				...state,
				isLoad : false
			};
	}

	return state;
};

export {dataLoader};
