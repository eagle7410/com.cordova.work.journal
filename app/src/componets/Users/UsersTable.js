import React from 'react';
import {connect} from 'react-redux';
import RowShow from './UsersRowShow';
import RowEdit from './UsersRowEdit';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow } from 'material-ui/Table';

const UsersTable = (state) => {
	let store = state.store;
	let rows = store.users;

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
					rows.map(row =>
						row._id === store.onEdit
							? <RowEdit key={`store_cat_${row._id}`} id={String(row._id)} row={row} />
							: <RowShow key={`store_cat_${row._id}`} id={String(row._id)} row={row} />
					)
				}
			</TableBody>
		</Table>
	);
};

export default connect(
	state => ({
		store: state.users,
	})
)(UsersTable);

