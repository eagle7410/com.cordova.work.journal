import {StepsDownload} from '../../const/Events'

const initialState = {
	loading   : false,
	finished  : false,
	stepIndex : 0,
	stop      : false
};

const stepsDownload  = (state = initialState, action) => {

	// eslint-disable-next-line
	switch (action.type) {
		case StepsDownload.reset:
			return {
				...initialState
			};

		case StepsDownload.stop:

			return {
				...state,
				loading : false,
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
				loading : next !== 4,
				finished : next === 4
			};
	}

	return state;
};

export {stepsDownload};
