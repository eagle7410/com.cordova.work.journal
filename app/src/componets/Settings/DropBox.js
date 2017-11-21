import React from 'react';
import {getPath, setConfigFile, initConnect} from '../../api/Cloud'
import ActionDown from 'material-ui/svg-icons/file/cloud-download';
import ActionUp from 'material-ui/svg-icons/file/cloud-upload';
import {Tabs, Tab} from 'material-ui/Tabs';
import {connect} from 'react-redux';
import CouldConnect from './Cloud/CouldConnect'
import StepsDownload from './Cloud/StepsDownload'
import StepsUpload from './Cloud/StepsUpload'
import {Alert, DropBoxConnect} from '../../const/Events'
import AlertStatus from '../../const/AlertStatus'

const DropBox = (state) => {
	const type = {type : 'dbox'};

	const InitConnect = () => {
		initConnect(type)
			.then(data => {
				state.init();
				state.showAlert('dropbox is init', AlertStatus.OK)
			})
			.catch(err => state.showAlert('No init dropbox', AlertStatus.BAD));
	};

	const loadConfig = () => {
		getPath({})
			.then(data => setConfigFile({...data, ...type}))
			.then(data => {
				state.isHaveConfig();
				state.showAlert('Config is save', AlertStatus.OK)
			})
			.catch(err => state.showAlert('No load config', AlertStatus.BAD));
	};

	return (
		<Tabs >
			<Tab label='Upload to DropBox' icon={<ActionUp />} >
				<CouldConnect store={state.connect} init={InitConnect} load_config={loadConfig}/>
				<StepsUpload  steps={state.stepsUpload} type={type} connect={state.connect}  />
			</Tab>
			<Tab label='Download from DropBox' icon={<ActionDown />} >
				<CouldConnect  store={state.connect} init={InitConnect} load_config={loadConfig}/>
				<StepsDownload steps={state.stepsDownload} type={type} connect={state.connect}  />
			</Tab>
		</Tabs>
	);

}

export default connect(
	state => ({
		connect : state.dropBoxSettingsForm,
		stepsUpload : state.dropBoxStepsUpload,
		stepsDownload : state.dropBoxStepsDownload,
	}),
	dispatch => ({
		showAlert   : (mess, type) => dispatch({
			type: Alert.show,
			data: {
				message: mess,
				status: type
			}
		}),
		isHaveConfig : () => dispatch({type : DropBoxConnect.isHaveConfig}),
		init : () => dispatch({type : DropBoxConnect.init}),
	})
)(DropBox);
