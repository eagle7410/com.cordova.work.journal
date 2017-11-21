import React from 'react';
import IconButton from 'material-ui/IconButton';
import ActionSave from 'material-ui/svg-icons/content/save';
import {actionSave} from '../../const/Colors'

const ActionButtonSave = (state) => (
	<IconButton tooltip="Save" touch={true} onTouchTap={state.onTouch}>
		<ActionSave color={actionSave}/>
	</IconButton>
);

export default ActionButtonSave;
