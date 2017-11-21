import React from 'react';
import {connect} from 'react-redux';
import RowShow from './StorageRowShow';
import RowEdit from './StorageRowEdit';
import {Table, TableBody, TableHeader, TableFooter, TableRowColumn, TableHeaderColumn, TableRow} from 'material-ui/Table';
import Pagination from 'material-ui-pagination';
import {Storage, StorageFilters} from '../../../const/Events'
import EmptyRow from '../../tools/EmptyRow'
import Paper from 'material-ui/Paper';

const StorageTable = (state) => {
	let store = state.store;
	let pagination = state.pagination;
	let total = state.total;

	return (
		<Paper style={{zIndex : 1}}>
			<Table fixedHeader={true} selectable={false}>
				<TableHeader displaySelectAll={false}>
					<TableRow >
						<TableHeaderColumn >Actions, Main data</TableHeaderColumn>
						<TableHeaderColumn >Comment</TableHeaderColumn>
					</TableRow>
				</TableHeader>
				<TableBody displayRowCheckbox={false} showRowHover={true}>
					{
						total === 0
							? <EmptyRow key='empty-row' col='2'/>
							: state.rows.map((row, inx) =>
							row.id === store.editRow
								? <RowEdit key={`store_${row.id}`} />
								: <RowShow key={`store_${row.id}`} row={row} />
						)
					}
				</TableBody>
				{
					total < 2
						? <TableFooter/>
						: <TableFooter>
							<TableRow>
								<TableRowColumn colSpan='2'>
									now {pagination.number} from {total}
									<Pagination
										total = { total }
										current = { pagination.number }
										display = { pagination.display }
										onChange = { number => state.onChangePage(number) }
									/>
								</TableRowColumn>
							</TableRow>
						</TableFooter>
				}
			</Table>
		</Paper>
	);
};

export default connect(
	state => ({
		store: state.storage,
		pagination : state.storagePagination
	}),
	dispatch => ({
		onChangePage : num => dispatch({type : Storage.changePage, data : num}),
		onSetHours : data => dispatch({type : StorageFilters.setHours, data : data})
	})
)(StorageTable);
