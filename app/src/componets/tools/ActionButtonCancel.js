import React from 'react';
import IconButton from 'material-ui/IconButton';
import ActionCancel from 'material-ui/svg-icons/navigation/cancel';
import {actionCancel} from '../../const/Colors'

const ActionButtonCancel = (state) => (
	<IconButton tooltip="Cancel" touch={true} onTouchTap={state.onTouch}>
		<ActionCancel color={actionCancel}/>
	</IconButton>
);

export default ActionButtonCancel;
