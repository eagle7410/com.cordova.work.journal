import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Toolbar, ToolbarGroup, ToolbarSeparator} from 'material-ui/Toolbar';
import TextField from 'material-ui/TextField';
import {StorageFilters, Storage} from '../../../const/Events'
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import ExtStyle from './StorageTools.css';
import Paper from 'material-ui/Paper';
import StorageToolsSettings from './StorageToolsSettings'
import FilterDateMode from '../../../const/FilterDateMode'
import {DateToString} from '../../../utils/Date'

const stylePanagation = {maxWidth: '30px'};

class StoreTools extends Component {

	changeCountInPage(ev, val) {
		val = Number(val);

		if (isNaN(val) || val === 0) {
			val = '';
		}

		this.props.changeCountInPage(val);
	}

	changeFilter(project, date, mode, projectAll) {
		let filters = this.props.filters;
		let from;
		let to;

		mode = mode || filters.filterDateMode;

		if (mode === FilterDateMode.useRange) {
			from = DateToString(date.from);
			to = DateToString(date.to);
			date = filters.filterDate;
		}

		from = from || filters.dateFrom;
		to = to || filters.dateTo;

		if (typeof projectAll !== 'boolean')
			projectAll = filters.projectAll;

		this.props.changeFiltes({
			filterDate: date,
			projectSelect: project,
			projectAll: projectAll,
			filterDateMode: mode,
			dateFrom: from,
			dateTo: to
		});
	}

	render() {
		let state = this.props;
		let filters = this.props.filters;

		return (
			<div>
				<Paper zDepth={2} style={{display: 'flex', width: '100%'}}>
					<Toolbar style={{zIndex: 4, width: '100%'}}>
						<ToolbarGroup>
							<FloatingActionButton
								className={filters.extToolsOpen ? 'tools-open' : ''}
								style={ExtStyle.tools}
								secondary={true}
								mini={true}
								onClick={state.toggleShowExtTools}
							>
								<ContentAdd/>
							</FloatingActionButton>

							<ToolbarSeparator/>
							hours: {state.hours}
							<ToolbarSeparator/>
							hoursFact: {state.hoursFact}
							<ToolbarSeparator/>
							Count in page
							<TextField style={stylePanagation} onChange={this.changeCountInPage.bind(this)}
							           value={state.pagination.split} id='inputPagi'
							           hintText='Enter'/>
						</ToolbarGroup>
					</Toolbar>
				</Paper>
				<StorageToolsSettings
					hours={state.hours}
					rows={state.rows}
					onChange={this.changeFilter.bind(this)}
				/>
			</div>
		);
	}
}

export default connect(
	state => ({
		filters: state.storageFilters,
		pagination: state.storagePagination,
		storage: state.storage
	}),
	dispatch => ({
		changeFiltes: data => dispatch({type: StorageFilters.chFilter, data: data}),
		changeCountInPage: val => dispatch({type: Storage.changeCountInPage, data: val}),
		toggleShowExtTools: () => dispatch({type: StorageFilters.tgShowExteds}),
	})
)(StoreTools);
