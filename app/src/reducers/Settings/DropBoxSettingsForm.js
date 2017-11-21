import {DropBoxConnect, StepsConnect} from '../../const/Events'
const initialState = {
	init         : false,
	isHaveConfig : false,
};

const dropBoxSettingsForm = (state = initialState, action) => {

	// eslint-disable-next-line
	switch (action.type) {
		case DropBoxConnect.isHaveConfig:
			return {
				...state,
				isHaveConfig : true
			};
		case DropBoxConnect.init:
			return {
				...state,
				init: true
			};

		case StepsConnect.init:

			return {
				...state,
				...action.data.dbox
			};

	}

	return state;
};

export {dropBoxSettingsForm};
