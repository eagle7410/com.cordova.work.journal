import React from 'react';
import IconButton from 'material-ui/IconButton';
import ActionEdit from 'material-ui/svg-icons/editor/mode-edit';
import {actionEdit} from '../../const/Colors'

const ActionButtonEdit = (state) => (
	<IconButton tooltip="Edit" touch={true} onTouchTap={ev => state.onTouch(state.id, ev)}>
		<ActionEdit color={actionEdit}/>
	</IconButton>
);

export default ActionButtonEdit;
