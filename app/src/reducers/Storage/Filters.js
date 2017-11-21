import {StorageFilters} from '../../const/Events'
import FilterDateMode from '../../const/FilterDateMode'

const initialState = {
	projectSelect     : false,
	projectAll        : true,
	filterDateMode    : FilterDateMode.noUse,
	filterDate        : '',
	hoursInDate       : 0,
	hoursFactInDate   : 0,
	rows              : [],
	dateFrom          : '',
	dateTo            : '',
	extToolsOpen      : false
};

const storageFilters = (state = initialState, action) => {

	// eslint-disable-next-line
	switch (action.type) {

		case StorageFilters.tgShowExteds :
			return {
				...state,
				extToolsOpen : !state.extToolsOpen
			};

		case StorageFilters.chFilter:
			return {
				...state,
				...action.data
			};

		case StorageFilters.chText:
			return {
				...state,
				searchText: action.data
			};

		case StorageFilters.toggleText:
			let show = !state.showSearchText;
			let text = '';

			if (show) {
				text = state.searchText;
			}

			return {
				...state,
				showSearchText : show,
				searchText     : text,
				searchIcoNow   : show ? state.searchIcoActive : state.searchIcoInactive
			};

	}

	return state;
};

export {storageFilters};
