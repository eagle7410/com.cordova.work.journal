import React from 'react';
import NavMenu from '../NavMenu/NavMenu';
import {Tabs, Tab} from 'material-ui/Tabs';
import Paper from 'material-ui/Paper';
import IconCloud from 'material-ui/svg-icons/file/cloud-circle'
import DataFileTravel from './DataFileTravel'
import {tabSettings} from '../../const/Styles'

const Settings = () => (
	<div>
		<NavMenu />
		<h1>Settings</h1>
		<Tabs initialSelectedIndex={0}>
			<Tab label='Work with data JSON file' icon={<IconCloud/>}  style={tabSettings}>
				<Paper zDepth={2}>
					<DataFileTravel/>
				</Paper>
			</Tab>
		</Tabs>
	</div>
);

export default Settings;
