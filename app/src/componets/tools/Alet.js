import React from 'react';
import {connect} from 'react-redux';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import SocialMood from 'material-ui/svg-icons/action/check-circle';
import SocialMoodBad from 'material-ui/svg-icons/action/report-problem';
import Paper from 'material-ui/Paper'
import AlertStatus from '../../const/AlertStatus'
import {Alert as Event} from '../../const/Events'
import {icoBad,icoOk,paper, title, button} from './AlertStyles'

const Alert = (state) => {
	let alert = state.store;

	return (
		<Dialog
			bodyStyle={{paddingBottom: '5px'}}
			actions={[<RaisedButton label="Is read" style={button}
            onTouchTap={state.onRead} primary={true}/>]} modal={false} open={alert.open}>
			<b style={title}>Message</b>
			<Paper style={paper}>

				<table>
					<tbody>
						<tr>
							<td>
							{
								alert.status === AlertStatus.OK
									? <SocialMood    style={icoOk}  />
									: <SocialMoodBad style={icoBad} />
							}
							</td>
							<td>{alert.message}</td>
						</tr>
					</tbody>
				</table>
			</Paper>
		</Dialog>
	);
};

export default connect(
	state => ({store: state.alert}),
	dispatch => ({onRead : () => dispatch({type : Event.close})})
)(Alert);
