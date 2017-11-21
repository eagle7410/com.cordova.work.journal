import {Confirm} from '../const/Events'

const initialState = {
	actionCancel  : '',
	actionConfirm : '',
	dataCancel    : false,
	dataConfirm   : false,
	callConfirm   : false,
	question      : '',
	open          : false
};

const dataConfirm = (state = initialState, action) => {
	// eslint-disable-next-line
	switch (action.type) {

		case Confirm.no:
			return {...initialState	};

		case Confirm.yes:
			return {...initialState	};

		case Confirm.show:
			let data = action.data;

			return {
				...state,
				...data,
				open : true,
			};
	}

	return state;
};

export {dataConfirm};

