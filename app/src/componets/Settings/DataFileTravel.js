import React from 'react';
import ActionDown from 'material-ui/svg-icons/file/cloud-download';
import ActionUp from 'material-ui/svg-icons/file/cloud-upload';
import {Tabs, Tab} from 'material-ui/Tabs';
import {connect} from 'react-redux';
import Download from './DataFileTravel/Download'
import Upload from './DataFileTravel/Upload'

const DataFileTravel = (state) => {
	return (
		<Tabs >
			<Tab label='Download' icon={<ActionDown />} >
				<Download steps={state.stepsDownload} />
			</Tab>
			<Tab label='Upload' icon={<ActionUp />} >
				<Upload  steps={state.stepsUpload} />
			</Tab>
		</Tabs>
	);
};

export default connect(
	state => ({
		stepsUpload : state.stepsUpload,
		stepsDownload : state.stepsDownload,
	})
)(DataFileTravel);
