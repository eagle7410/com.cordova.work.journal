import React from 'react';
import {connect} from 'react-redux';
import {del} from '../../../api/Projects'
import { TableRowColumn, TableRow } from 'material-ui/Table';
import ActionButtonDelete from '../../tools/ActionButtonDelete'
import ActionButtonEdit from '../../tools/ActionButtonEdit'
import AlertStatus from '../../../const/AlertStatus'
import {StorageProjects, Alert, Confirm as ConfirmAction} from '../../../const/Events'
import {Confirm, CategoryError} from '../../../const/Messages'

const ProjectsRowShow = (state) => {

	const onDelete = id => {
		state.confirm(id, ()=> new Promise((ok, bad) => {
			del(id)
				.then(() => ok(true))
				.catch(e => {
					state.showAlert(CategoryError.move, AlertStatus.BAD);
					bad();
				});
		}));
	};

	return (
		<TableRow >
			<TableRowColumn style={{overflow: 'visible'}}>
				<ActionButtonDelete id={state.id} onTouch={onDelete}/>
				<ActionButtonEdit id={state.id} onTouch={state.onEdit}/>
				{state.name}
			</TableRowColumn>
		</TableRow>
	);
};

export default connect(
	state => ({
		store      : state.storage,
		categories : state.storageProjects
	}),
	dispatch => ({
		onEdit  : id => dispatch({type : StorageProjects.editMode , data : id}),
		confirm : (id, backPromise) => dispatch({
			type : ConfirmAction.show,
			data : {
				actionCancel       : StorageProjects.moveCancel,
				actionConfirm      : StorageProjects.move,
				question           : Confirm.question,
				dataConfirm        : id,
				callPromiseConfirm : backPromise
			}
		}),
		showAlert : (mess, type) => dispatch({
			type : Alert.show,
			data : {
				message: mess,
				status: type
			}
		})
	})
)(ProjectsRowShow);
