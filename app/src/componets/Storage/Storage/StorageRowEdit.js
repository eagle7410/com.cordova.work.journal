import React from 'react';
import {connect} from 'react-redux';
import ActionButtonSave from '../../tools/ActionButtonSave'
import ActionButtonCancel from '../../tools/ActionButtonCancel'
import { TableRowColumn, TableRow } from 'material-ui/Table';
import DatePicker from 'material-ui/DatePicker';
import TextField from 'material-ui/TextField';
import {Storage, Alert} from '../../../const/Events'
import {edit} from '../../../api/Storage'
import AlertStatus from '../../../const/AlertStatus'
import {styleBlockInCell, styleRow, styleTextFieldEdit} from '../../../const/Styles'
import {getRecord} from '../../../utils/GetRecord'

const StorageRowEdit = (state) => {
	const store = state.store;
	const row = store.editRowData;
	const id = row.id;
	const styleLabel = {color : '#ccc'};
	const save = () => {
		edit(getRecord(store.editRow, row))
			.then(state.onSaveEdit)
			.catch(err => state.showAlert(err, AlertStatus.BAD));
	};

	return (
		<TableRow >
			<TableRowColumn style={styleRow}>
				<div style={styleBlockInCell}>
					<div>
						<ActionButtonCancel onTouch={state.onCancel}/>
						<ActionButtonSave onTouch={save}/>
					</div>
				</div>
				<div style={styleBlockInCell}>
					<span style={styleLabel}>Project :</span>{state.projects.list[row.project]}&nbsp;
					<span style={styleLabel}>task :</span>
						<TextField value={row.task} onChange={ev => state.onEditText('task', ev.target.value)} style = {styleTextFieldEdit} id={`edtP_${id}`} />
					<br/>
					<span style={styleLabel}>hours :</span>
						<TextField value={row.hours} onChange={ev => state.onEditText('hours', ev.target.value)} style ={styleTextFieldEdit} id={`edtA_${id}`} />
					&nbsp;
					<span style={styleLabel}>hours_fact :</span>
						<TextField onChange={ev => state.onEditText('hours_fact', ev.target.value)} style={styleTextFieldEdit} id={`edtA_${id}`} value={row.hours_fact}/>
					<br/>
					Date doit:
					<DatePicker
						style={styleTextFieldEdit}
						defaultDate={new Date(row.date_doit)}
						rows={4}
						hintText='Date doit'
						onChange={(ev, date) => state.onEditText('date_doit', date)}
					/><br/>


				</div>
			 </TableRowColumn>
			<TableRowColumn  >
				<TextField
					hintText='Enter comment'
					multiLine={true}
					value={row.comment}
					onChange={state.onEditDesc}
				/>
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
		onCancel   : () => dispatch({type : Storage.editClear}),
		onSaveEdit : () => dispatch({type : Storage.saved}),
		onEditDesc : ev => dispatch({
			type : Storage.edit,
			data : {
				type : 'comment',
				val  : ev.target.value
			}
		}),
		onEditText: (type,val) => dispatch({
			type : Storage.edit,
			data : {
				type : type,
				val  : val
			}
		}),
		showAlert: (mess, type) => dispatch({
			type : Alert.show,
			data : {
				message: mess,
				status: type
			}
		})
	})
)(StorageRowEdit);
