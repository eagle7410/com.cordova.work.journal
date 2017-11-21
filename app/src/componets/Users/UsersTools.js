import React from 'react';
import {connect} from 'react-redux';
import {Toolbar, ToolbarGroup, ToolbarTitle} from 'material-ui/Toolbar';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import ActionAdd from 'material-ui/svg-icons/content/add-circle';
import {add} from '../../api/User'
import AlertStatus from '../../const/AlertStatus'
import {Users, Alert} from '../../const/Events'
import IconButton from 'material-ui/IconButton';
import Drawer from 'material-ui/Drawer';

const UsersTools = (state) => {
	let store = state.store;

	const handelSave = () => {
		const login = store.addName;
		const pass  = store.addPass;

		if (!login || !pass) {
			return state.showAlert(`Enter user ${!login ? 'login' : 'pass'}`, AlertStatus.BAD);
		}

		add({
			login : login,
			pass  : pass
		})
			.then(data => {
				state.save(data);
				state.showAlert('User is saved.', AlertStatus.OK);
			})
			.catch(err => {
				state.showAlert(
					(err.message || (err.target && err.target.error.message ) || err)
					, AlertStatus.BAD
				)
			});
	};

	return (
		<div>
			<Toolbar>
				<ToolbarGroup >
					<IconButton tooltip="Open adding tools"
					            disabled={state.store.isOpenAddingTools}
					            onTouchTap={state.toolsOpen}
					>
						<ActionAdd/>
					</IconButton>
					<ToolbarTitle text="Tools"/>
				</ToolbarGroup>
			</Toolbar>
			<Drawer
				open={state.store.isOpenAddingTools}
			>
				<RaisedButton
					label={'Close tools'}
					secondary={true}
					onTouchTap={state.toolsClose}
					style={{marginRight : 20}}
				/>
				<TextField
					hintText={'Enter user'}
					value={store.addName}
					onChange={state.onChangeAddName}
				/>
				<TextField hintText={'Enter password'}
				           value={store.addPass}
				           onChange={state.onChangeAddPass}
				/>
				<RaisedButton
					label="Add user"
					primary={true}
					icon={<ActionAdd />}
					onTouchTap={handelSave}
				/>
			</Drawer>
		</div>

	);
};

export default connect(
	state => ({
		store: state.users
	}),
	dispatch => ({
		toolsClose      :  ev => dispatch({type : Users.addingToolsClose}),
		toolsOpen       :  ev => dispatch({type : Users.addingToolsOpen}),
		onChangeAddName : ev => dispatch({type : Users.createWrite, data : {
			type : 'addName',
			val  : ev.target.value,
		}}),
		onChangeAddPass : ev => dispatch({type : Users.createWrite, data : {
			type : 'addPass',
			val  : ev.target.value,
		}}),
		save : (data) => dispatch({type : Users.create, data : data}),
		showAlert: (mess, type) => dispatch({
			type: Alert.show,
			data: {
				message: mess,
				status: type
			}
		}),
	})
)(UsersTools);
