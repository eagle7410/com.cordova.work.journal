import {Users} from '../../const/Events';
const initialState = {
	users    : [],
	editName : '',
	addName  : '',
	addPass  : '',
	onEdit   : false,
	isOpenAddingTools : false
};

const users = (state = initialState, action) => {
	let users;

	// eslint-disable-next-line
	switch (action.type) {
		case Users.addingToolsOpen:
			return {
				...state,
				isOpenAddingTools : true
			};
		case Users.addingToolsClose:
			return {
				...state,
				isOpenAddingTools : false
			};
		case Users.init:
			return {
				...state,
				users: action.data
			};

		case Users.editMode:
			action.data = Number(action.data);

			return {
				...state,
				editName: state.users.find(user => user._id === action.data).login,
				onEdit: action.data
			};
		case Users.edit:
			return {
				...state,
				editName: action.data,
			};

		case Users.editCancel:
			return {
				...state,
				editName: '',
				onEdit: false
			};

		case Users.editSave:
			users = state.users.map(user => {
				if (user._id === state.onEdit) {
					user.login = state.editName;
				}

				return user;
			});
			return {
				...state,
				users: users,
				editName: '',
				onEdit: false
			};

		case Users.create:
			users = [].concat(state.users);
			users.push(action.data);
			return {
				...state,
				users: users,
				addName: '',
				addPass: ''
			};

		case Users.createWrite:
			let newState = {...state};
			newState[action.data.type] = action.data.val;
			return newState;

		case Users.move :
			users = [].concat(state.users);
			users = users.filter(user => user._id !== action.data);
			return {
				...state,
				users : users
			}
	}

	return state;
};

export {users};
