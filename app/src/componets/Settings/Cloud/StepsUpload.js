import React from 'react';
import {connect} from 'react-redux';
import { Step, Stepper, StepLabel} from 'material-ui/Stepper';
import RaisedButton from 'material-ui/RaisedButton';
import {StepsUpload as Events, Alert} from '../../../const/Events'
import {DropBox} from '../../../const/Messages'
import AlertStatus from '../../../const/AlertStatus'
import {postArchive, putCloudArchive} from '../../../api/Cloud'
import StepsSimpleContent from './StepsSimpleContent'

const styleBlock       = {width: '100%', maxWidth: 700, margin: 'auto'};
const styleButtonBlock = {marginTop: 24, marginBottom: 12};

const StepsUpload = (state) => {
	const store    = state.steps;
	const connect  = state.connect ;
	const typeData = state.type;
	const finished  = store.finished;
	const stepIndex = store.stepIndex;
	const loading   = store.loading;
	const handelRun = () => {
		state.run(typeData);
		postArchive()
			.then(date => {
				state.next(typeData);
				return putCloudArchive({...typeData, date : date});
			})
			.then(() => state.next(typeData))
			.catch(err => {
				state.stop(typeData);
				console.log('Error create archive', err);
				state.showAlert(DropBox.badTryUpload, AlertStatus.BAD)
			});
	};

	const actionDisable = !connect.init || loading;

	return (
		 <div style={styleBlock}>
			 <div style={styleButtonBlock}>
				<RaisedButton
					label={'Run'}
					disabled={actionDisable}
					primary={true}
					onTouchTap={handelRun}
				/>
				<RaisedButton
					label={'Restart'}
					disabled={!finished}
					secondary={true}
					onTouchTap={() => state.reset(typeData)}
				/>
				<StepsSimpleContent finished={finished} loading={loading} stop={store.stop}/>
			</div>
			<Stepper activeStep={stepIndex}>
				<Step><StepLabel>Create acrhive</StepLabel></Step>
				<Step><StepLabel>Upload to DropBox</StepLabel></Step>
			</Stepper>

		  </div>
		);
}

export default connect(
	state => ({}),
	dispatch => ({
		run       : (typeData) => dispatch({type : Events.run,    data: typeData.type}),
		stop      : (typeData) => dispatch({type : Events.stop,   data: typeData.type}),
		next      : (typeData) => dispatch({type : Events.next,   data: typeData.type}),
		reset     : (typeData) => dispatch({type : Events.reset,  data: typeData.type}),
		showAlert : (mess, type) => dispatch({
			type: Alert.show, data: {
				message: mess,
				status: type
			}
		})
	})
)(StepsUpload);
