import React from 'react';
import {connect} from 'react-redux';
import RowShow from './ProjectsRowShow';
import RowEdit from './ProjectsRowEdit';
import {Table,TableBody,TableHeader,TableHeaderColumn,TableRow} from 'material-ui/Table';

const ProjectsTable = (state) => {
	let store = state.store;
	let rows = store.list;
	let ids =  Object.keys(rows);

	return (
		<Table fixedHeader={true} selectable={false} >
			<TableHeader displaySelectAll={false}>
				<TableRow>
					<TableHeaderColumn>Name</TableHeaderColumn>
				</TableRow>
			</TableHeader>
			<TableBody
				displayRowCheckbox={false}
				showRowHover={true}
			>
				{
					ids.map(id =>
						id === store.onEdit
							? <RowEdit key={`store_cat_${id}`} id={id} name={rows[id]} />
							: <RowShow key={`store_cat_${id}`} id={id} name={rows[id]} />
					)
				}
			</TableBody>
		</Table>
	);
};

export default connect(
	state => ({
		store: state.storageProjects
	})
)(ProjectsTable);
