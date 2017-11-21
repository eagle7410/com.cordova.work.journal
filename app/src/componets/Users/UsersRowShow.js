import React from 'react';
import {connect} from 'react-redux';
import {del} from '../../api/User'
import { TableRowColumn, TableRow } from 'material-ui/Table';
import ActionButtonDelete from '../tools/ActionButtonDelete'
import ActionButtonEdit from '../tools/ActionButtonEdit'
import AlertStatus from '../../const/AlertStatus'
import {Users, Confirm} from '../../const/Events'
import {Confirm as ConfirmMess, Alert} from '../../const/Messages'

const UsersRowShow = (state) => {

	const onDelete = id => {
		id = Number(id);

		state.confirm(id, ()=> new Promise((ok, bad) => {
			del(id).then(r => ok(true), e => {
				console.log('Error delete user', e);
				state.showAlert('Error delete user', AlertStatus.BAD);
				bad();
			});
		}));

	};

	return (
		<TableRow >
			<TableRowColumn style={{overflow: 'visible'}}>
				<ActionButtonDelete id={state.id} onTouch={onDelete}/>
				<ActionButtonEdit id={state.id} onTouch={state.onEdit}/>
				{state.row.login}
			</TableRowColumn>
		</TableRow>
	);
};

export default connect(
	state => ({
		store: state.storage,
		categories : state.storageCategories
	}),
	dispatch => ({
		onEdit : id => dispatch({type : Users.editMode, data : id}),
		confirm : (id, backPromise) => dispatch({
			type : Confirm.show,
			data : {
				actionCancel       : Users.moveCancel,
				actionConfirm      : Users.move,
				question           : ConfirmMess.question,
				dataConfirm        : id,
				callPromiseConfirm : backPromise
			}
		}),
		showAlert: (mess, type) => dispatch({
			type: Alert.show, data: {
				message: mess,
				status: type
			}
		}),
	})
)(UsersRowShow);
