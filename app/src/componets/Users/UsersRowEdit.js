import React from 'react';
import {connect} from 'react-redux';
import { TableRowColumn, TableRow } from 'material-ui/Table';
import ActionButtonSave from '../tools/ActionButtonSave'
import ActionButtonCancel from '../tools/ActionButtonCancel'
import TextField from 'material-ui/TextField';
import {edit} from '../../api/User'
import AlertStatus from '../../const/AlertStatus'
import {Users, Alert} from '../../const/Events'

const UsersRowEdit = (state) => {
	const store = state.store;

	const saveEdit = () => {
		edit({
			id :state.id,
			login :store.editName
		}).then(
			r => state.onSaveEdit(state.id),
			e => state.showAlert(e.message || e, AlertStatus.BAD)
		);
	};

	return (
		<TableRow >
			<TableRowColumn style={{overflow: 'visible'}}>
				<ActionButtonCancel onTouch={state.onCancel}/>
				<ActionButtonSave onTouch={saveEdit}/>
				<TextField value={store.editName} id={state.id} onChange={state.onEdit}/>
			</TableRowColumn>
		</TableRow>
	);
};

export default connect(
	state => ({
		store: state.users,
	}),
	dispatch => ({
		onCancel : () => dispatch({type : Users.editCancel}),
		onSaveEdit : () => dispatch({type : Users.editSave}),
		onEdit: event => dispatch({type : Users.edit, data: event.target.value}),
		showAlert: (mess, type) => dispatch({
			type: Alert.show, data: {
				message: mess,
				status: type
			}
		}),
	})
)(UsersRowEdit);
