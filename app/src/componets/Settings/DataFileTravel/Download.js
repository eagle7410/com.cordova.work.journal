import React from 'react';
import {connect} from 'react-redux';
import { Step, Stepper, StepLabel} from 'material-ui/Stepper';
import RaisedButton from 'material-ui/RaisedButton';
import {StepsDownload as Events,Alert, StorageProjects, Users, Storage} from '../../../const/Events'
import AlertStatus from '../../../const/AlertStatus'
import {styleBlock, styleButtonBlock, styleInputFile} from '../../../const/Styles'
import {extractArchiveAndMigrate} from '../../../api/DataFIle'
import StepsSimpleContent from './StepsSimpleContent'
import ActionLoad from 'material-ui/svg-icons/file/file-download';

const StepsDownload = (state) => {
	const store    = state.steps;
	const finished  = store.finished;
	const stepIndex = store.stepIndex;
	const loading   = store.loading;

	const getFileContent = ($ev) => new Promise((ok, bad) => {
		let files = $ev.target.files;

		if (!files.length) {
			return ok('');
		}

		let reader = new FileReader();

		reader.onload = () => {
			ok(reader.result);
		};

		reader.readAsBinaryString(files[0]);
	});

	const handelClick = ($ev) => {
		if (loading) {
			$ev.preventDefault();
		}
	};

	const handelDownload = async ($ev)  => {

		try {
			state.reset();
			state.run();

			let binary = await getFileContent($ev);

			if (!binary) {
				throw new Error('Binary data is empty');
			} else {
				extractArchiveAndMigrate(state, binary);
				state.next();
			}

		} catch (err) {
			console.log('err ', err);
			state.stop();
			state.showAlert((err.message || (err.target && err.target.error.message ) || err), AlertStatus.BAD);
		}
	};

	const actionDisable = loading;

	return (
		<div style={styleBlock}>
			<div style={styleButtonBlock}>
				<RaisedButton
					label='Download'
					labelPosition="before"
					secondary={true}
					icon={
						actionDisable
						 ? <StepsSimpleContent finished={finished} loading={loading} stop={store.stop}/>
						:<ActionLoad />
					}
					disabled={actionDisable}
				>
					<input type="file"
					       style={styleInputFile}
					       onChange={handelDownload}
					       onClick={handelClick}
					/>
				</RaisedButton>
			</div>
			<Stepper activeStep={stepIndex} orientation="vertical">
				<Step><StepLabel>Download</StepLabel></Step>
				<Step><StepLabel>Extract archive</StepLabel></Step>
				<Step><StepLabel>Merge data</StepLabel></Step>
				<Step><StepLabel>Update App</StepLabel></Step>
			</Stepper>
		</div>
	);
};

export default connect(
	state => ({}),
	dispatch => ({
		run       : (typeData) => dispatch({type : Events.run,}),
		stop      : (typeData) => dispatch({type : Events.stop}),
		next      : (typeData) => dispatch({type : Events.next}),
		reset     : (typeData) => dispatch({type : Events.reset}),

		initUsers      : data  => dispatch({type: Users.init , data: data}),
		initStorage    : data  => dispatch({type: Storage.init , data: data}),
		initProjects : data  => dispatch({type: StorageProjects.init , data: data}),
		showAlert : (mess, type) => dispatch({
			type : Alert.show,
			data : {
				message: mess,
				status: type
			}
		})
	})
)(StepsDownload);
