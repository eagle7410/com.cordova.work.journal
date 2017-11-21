import React from 'react';
import {connect} from 'react-redux';
import { TableRowColumn, TableRow } from 'material-ui/Table';
import TextField from 'material-ui/TextField';
import ActionButtonDelete from '../../tools/ActionButtonDelete'
import ActionButtonEdit from '../../tools/ActionButtonEdit'
import {Storage, Confirm as ConfirmAction} from '../../../const/Events'
import {Confirm} from '../../../const/Messages'
import AlertStatus from '../../../const/AlertStatus'
import {del} from '../../../api/Storage'
import {styleDataLabel, styleRow, styleBlockInCell} from '../../../const/Styles'

const StorageRowShow = (state) => {
	const row = state.row;
	const onDelete = id => {
		state.confirm(id, ()=> new Promise((ok, bad) =>
			del(id)
				.then(r => ok(true))
				.catch(e => {
					state.showAlert(Storage.move, AlertStatus.BAD);
					bad();
				})
		));
	};

	return (
		<TableRow >
			<TableRowColumn style={styleRow}>
				<div style={styleBlockInCell}>
					<div>
						<ActionButtonDelete id={row.id} onTouch={onDelete}/>
						<ActionButtonEdit id={row.id} onTouch={state.onEdit}/>
					</div>
				</div>
				<div style={styleBlockInCell}>
					<span style={styleDataLabel}>Project :</span> {state.projects.list[row.project]}&nbsp;
					<span style={styleDataLabel}>Task    :</span> {row.task}&nbsp;
					<span style={styleDataLabel}>Date doit    :</span> {row.date_doit.substring(0, 10)}&nbsp;
					<span style={styleDataLabel}>Hours     :</span> {row.hours}&nbsp;
					<span style={styleDataLabel}>Hours_fact  :</span> {row.hours_fact}&nbsp;
					<TextField
						hintText='Enter comment'
						multiLine={true}
						rows={1}
						value={row.comment}
					 />
				</div>
			 </TableRowColumn>

		</TableRow>
	);
};

export default connect(
	state => ({
		store: state.storage,
		projects : state.storageProjects
	}),
	dispatch => ({
		onEdit : id => dispatch({type : Storage.modeEdit, data : id}),
		confirm : (id, backPromise) => dispatch({
			type : ConfirmAction.show,
			data : {
				actionCancel       : Storage.moveCancel,
				actionConfirm      : Storage.move,
				question           : Confirm.question,
				dataConfirm        : id,
				callPromiseConfirm : backPromise
			}
		})
	})
)(StorageRowShow);
