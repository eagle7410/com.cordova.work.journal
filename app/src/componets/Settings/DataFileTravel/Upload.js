import React from 'react';
import {connect} from 'react-redux';
import {Step, Stepper, StepLabel} from 'material-ui/Stepper';
import RaisedButton from 'material-ui/RaisedButton';
import {StepsUpload as Events, Alert} from '../../../const/Events'
import {getDataJsonFile} from '../../../api/DataFIle'
import StepsSimpleContent from './StepsSimpleContent'
import ActionUpload from 'material-ui/svg-icons/file/file-upload';

const styleBlock = {width: '100%', maxWidth: 700, margin: 'auto'};
const styleButtonBlock = {marginTop: 24, marginBottom: 12};

const StepsUpload = (state) => {
	const store = state.steps;
	const finished = store.finished;
	const stepIndex = store.stepIndex;
	const loading = store.loading;

	const handelRun = () => {
		state.reset();

		getDataJsonFile(state);

		state.run();
	};

	const actionDisable = loading;

	return (
		<div style={styleBlock}>
			<div style={styleButtonBlock}>
				<RaisedButton
					label='Upload'
					labelPosition="before"
					secondary={true}
					icon={
						actionDisable
							? <StepsSimpleContent finished={finished} loading={loading} stop={store.stop}/>
							: <ActionUpload />
					}
					disabled={actionDisable}
					onTouchTap={handelRun}
				/>
				<StepsSimpleContent finished={finished} loading={loading} stop={store.stop}/>
			</div>
			<Stepper activeStep={stepIndex} orientation="vertical">
				<Step><StepLabel>Create acrhive</StepLabel></Step>
				<Step><StepLabel>Upload</StepLabel></Step>
			</Stepper>

		</div>
	);
}

export default connect(
	state => ({}),
	dispatch => ({
		run: () => dispatch({type: Events.run}),
		stop: () => dispatch({type: Events.stop}),
		next: () => dispatch({type: Events.next}),
		reset: () => dispatch({type: Events.reset}),
		showAlert: (mess, type) => dispatch({
			type: Alert.show, data: {
				message: mess,
				status: type
			}
		})
	})
)(StepsUpload);
