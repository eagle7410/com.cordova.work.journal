import React from 'react';
import {connect} from 'react-redux';
import ProjectsTools from './ProjectsTools'
import ProjectsTable from './ProjectsTable'

const Projects = (state) => (
	<div>
		<ProjectsTools/>
		<ProjectsTable/>
	</div>
);

export default connect(
	state => ({
		store: state.store
	})
)(Projects);
