import {Storage, StorageFilters} from '../../const/Events'

const initialState = {
	split   : 8,
	display : 5,
	number  : 1
};

const storagePagination = (state = initialState, action) => {
	// eslint-disable-next-line
	switch (action.type) {
		case Storage.changePage:
			return {
				...state,
				number: action.data
			};

		case Storage.changeCountInPage:
			return {
				...state,
				split : action.data
			};

		case StorageFilters.chFilter:
		case StorageFilters.chCat:
		case StorageFilters.chText:
			return {
				...state,
				number: 1
			};
	}

	return state;
};

export {storagePagination};
