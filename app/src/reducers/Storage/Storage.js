import {RecordAdd, Storage} from '../../const/Events'

const initialState = {
	data        : [],
	dates       : [],
	editRow     : -1,
	editRowData : false
};

const addDate = (dates, date) => {
	let dt = date.substr(0, 10);

	if (!~dates.indexOf(dt)) {
		dates.push(dt);
	}

	return dates;
};

const storage = (state = initialState, action) => {

	let editRowData;
	let data;
	let dates;

	// eslint-disable-next-line
	switch (action.type) {
		case Storage.init:
			dates = [new Date().toISOString().slice(0, 10)];

			if (action.data && action.data.length) {
                action.data.map(rec => 	dates = addDate(dates, rec.date_doit));
			}

			return {
				...state,
				data : action.data,
				dates : dates
			};

		case RecordAdd.save:
			dates = addDate([].concat(state.dates), action.data.date_doit);

			return {
				...state,
				data : [action.data].concat(state.data),
				dates : dates
			};

		case Storage.move:
			data = [].concat(state.data);
			data.splice(data.findIndex(row => row.id === action.data), 1);

			return {
				...state,
				data: data
			};

		case Storage.modeEdit:
			const id = action.data;

			return {
				...state,
				editRow: id,
				editRowData: Object.assign({}, state.data.find(row => row.id === id))
			};

		case Storage.editClear:
			return {
				...state,
				editRow: -1,
				editRowData: false
			};

		case Storage.saved:
			data = [].concat(state.data);
			let updateRecord = Object.assign({}, state.editRowData);
			data[data.findIndex(row => row.id === state.editRow)] = updateRecord;
			dates = addDate([].concat(state.dates), updateRecord.date_doit);

			return {
				...state,
				editRowData: false,
				editRow: -1,
				data: data,
				dates : dates
			};

		case Storage.edit:
			editRowData = Object.assign({}, state.editRowData);
			editRowData[action.data.type] = action.data.val;

			if (typeof editRowData.date_doit === 'object' ) {
				editRowData.date_doit = editRowData.date_doit.toISOString();
			}

			return {
				...state,
				editRowData: editRowData
			};
	}

	return state;
};

export {storage};
