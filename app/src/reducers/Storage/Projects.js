import {StorageProjects} from '../../const/Events'
const initialState = {
	list     : {},
	noChoice : [2],
	onEdit   : false,
	editName : '',
	addName  : '',
	isOpenAddingTools : false
};

const storageProjects = (state = initialState, action) => {
	let list;

	// eslint-disable-next-line
	switch (action.type) {
		case StorageProjects.addingToolsOpen:
			return {
				...state,
				isOpenAddingTools : true
			};
		case StorageProjects.addingToolsClose:
			return {
				...state,
				isOpenAddingTools : false
			};
		case StorageProjects.init:
			return {
				...state,
				list : action.data
			};

		case StorageProjects.createMode:
			return {
				...state,
				addName : action.data
			};

		case StorageProjects.create:
			list = Object.assign({}, state.list);
			list[action.data.id] = action.data.name;

			return {
				...state,
				list : list,
				addName : ''
			};

		case StorageProjects.edit:
			return {
				...state,
				editName : action.data
			};

		case StorageProjects.editSave:
			list = Object.assign({}, state.list);
			list[String(state.onEdit)] = state.editName;
			return {
				...state,
				list: list,
				onEdit: false,
				editName: ''
			};

		case StorageProjects.editMode:
			return {
				...state,
				onEdit: action.data,
				editName : state.list[String(action.data)]
			};

		case StorageProjects.editCancel:
			return {
				...state,
				onEdit: false,
				editName: ''
			};

		case StorageProjects.move:
			list = Object.assign({}, state.list);
			delete list[action.data];
			return {
				...state,
				list : list
			};

	}

	return state;
};

export {storageProjects};
