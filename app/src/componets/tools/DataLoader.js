import React, {Component} from 'react';
import {connect} from 'react-redux';
import LoadAnimation from './LoadAnimation'
import {fullData}  from '../../api/Loader'
import AlertStatus from '../../const/AlertStatus'
import {Redirect} from 'react-router-dom';
import {StepsConnect, StorageProjects, Storage, Alert, DataLoader as DataLoaderEvent, Users} from '../../const/Events'
import {Alert as AlertMess} from '../../const/Messages'

class DataLoader extends Component {

	constructor (props) {
		super(props);

		fullData().then(res => {
			[
				'Projects',
				'Users',
				'Storage',
				'Settings'
			].forEach(
				p => {
					let call = props[`init${p}`];

					if (!call) return false;

					call(res[p.toLowerCase()])
				}
			);
			props.isLoadOk();

		}, e => {
			props.showAlert(AlertMess.noGetData, AlertStatus.BAD);
			props.isLoadBad();
		});
	}

	render() {
		let content = this.props.store.isOk ? <Redirect to={this.props.pathAfter} /> : <div>Not work</div>;

		return this.props.store.isLoad ? <LoadAnimation /> : content ;
	}

}

export default connect(
	state => ({
		store: state.dataLoader
	}),
	dispatch => ({
		isLoadOk       : ()    => dispatch({type: DataLoaderEvent.ok}),
		isLoadBad      : ()    => dispatch({type: DataLoaderEvent.bad}),
		initUsers      : data  => dispatch({type: Users.init , data: data}),
		initStorage    : data  => dispatch({type: Storage.init , data: data}),
		initSettings   : data  => dispatch({type: StepsConnect.init , data: data}),
		initProjects   : data  => dispatch({type: StorageProjects.init , data: data}),
		showAlert      : (mess, type) => dispatch({type : Alert.show, data: {
			message : mess,
			status  : type
		}})
	})
)(DataLoader);
