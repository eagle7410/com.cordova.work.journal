import {StepsDownload} from '../../const/Events'

const initialState = {
	loading   : false,
	finished  : false,
	stepIndex : 0,
	stop      : false
};

const dropBoxStepsDownload  = (state = initialState, action) => {

	if (action.data !== 'dbox') {
		return state;
	}

	// eslint-disable-next-line
	switch (action.type) {
		case StepsDownload.reset:
			return {
				...initialState
			};

		case StepsDownload.stop:

			return {
				...state,
				finished : true,
				stop : true
			};

		case StepsDownload.run:
			return {
				...state,
				loading : true
			};

		case StepsDownload.next:
			const next = state.stepIndex + 1;
			return {
				...state,
				stepIndex : next,
				finished : next === 5
			};
	}

	return state;
};

export {dropBoxStepsDownload};
