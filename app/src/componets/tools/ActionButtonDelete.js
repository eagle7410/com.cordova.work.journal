import React from 'react';
import IconButton from 'material-ui/IconButton';
import ActionDelete from 'material-ui/svg-icons/action/delete-forever';
import {actionDelete} from '../../const/Colors'

const ActionButtonDelete = (state) => (
	<IconButton tooltip="Delete" touch={true} onTouchTap={ev => state.onTouch(state.id, ev)}>
		<ActionDelete color={actionDelete}/>
	</IconButton>
);

export default ActionButtonDelete;
