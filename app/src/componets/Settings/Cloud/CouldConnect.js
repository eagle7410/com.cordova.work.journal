import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import {styleIconDisable, styleIconEnable} from '../../../const/Styles'
import ActionLoad from 'material-ui/svg-icons/file/file-download';
import ActionEnable from 'material-ui/svg-icons/action/check-circle';
import ActionDisable from 'material-ui/svg-icons/action/highlight-off';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';

const CouldConnect = (state) => {

	return (
		<Toolbar>
			<ToolbarGroup >
				<ToolbarTitle text='Connect'/>
				<ToolbarSeparator />
				<RaisedButton
					label={'Init'}
					primary={true}
					disabled={!state.store.isHaveConfig || state.store.init}
					onTouchTap={state.init}
				/>

				<ToolbarSeparator />
				<RaisedButton
					label='Load config'
					secondary={true}
					onTouchTap={state.load_config}
					icon={<ActionLoad />}
				/>
				<ToolbarSeparator />
				{state.store.isHaveConfig ?<ActionEnable style={styleIconEnable}/> : <ActionDisable style={styleIconDisable}/> }
				<span style={{margin : 10}}>Have config</span>
			</ToolbarGroup>
		</Toolbar>
	);
};

export default CouldConnect;
