import {StepsUpload} from '../../const/Events'

const initialState = {
	loading   : false,
	finished  : false,
	stepIndex : 0,
	stop      : false
};

const googleStepsUpload  = (state = initialState, action) => {

	if (action.data !== 'google') {
		return state;
	}

	// eslint-disable-next-line
	switch (action.type) {
		case StepsUpload.reset:
			return {
				...initialState
			};

		case StepsUpload.stop:
			return {
				...state,
				finished : true,
				stop : true
			};

		case StepsUpload.run:
			return {
				...state,
				loading : true
			};

		case StepsUpload.next:
			const next = state.stepIndex + 1;
			return {
				...state,
				stepIndex : next,
				finished : next === 2
			};
	}

	return state;
};

export {googleStepsUpload};
