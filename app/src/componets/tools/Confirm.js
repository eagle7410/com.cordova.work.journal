import React from 'react';
import {connect} from 'react-redux';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import {Confirm as Action} from '../../const/Events'

const Confirm = (state) => {
	let confirm = state.store;
	const confirmAction = () => {

		state.close();

		if (typeof confirm.callPromiseConfirm === 'function') {
			confirm.callPromiseConfirm().then(
				isDelete => state.onOk(confirm.actionConfirm, confirm.dataConfirm, isDelete),
				() => state.onOk(confirm.actionConfirm, confirm.dataConfirm, false),
			);
		} else {
			state.onOk(confirm.actionConfirm, confirm.dataConfirm, true);
		}
	};

	const actions = [
		<FlatButton
			label="Cancel"
			primary={true}
			onTouchTap={ev => state.onCancel(confirm.actionCancel, confirm.dataCancel) }
		/>,
		<FlatButton
			label="Ok"
			secondary={true}
			onTouchTap={confirmAction}
		/>,
	];

	return (
			<Dialog
				actions={actions}
				modal={false}
				open={confirm.open}
			>
				{confirm.question}
			</Dialog>
	);
};

export default connect(
	state => ({
		store : state.dataConfirm
	}),
	dispatch => ({
		onCancel : (type, data) => {
			dispatch({type : Action.no});
			dispatch({type : type, data: data})
		},
		close    : () => dispatch({type : Action.yes}),
		onOk     : (type, data, isDelete) => {
			if (isDelete) {
				dispatch({type : type, data: data})
			}
		},
	})
)(Confirm);
