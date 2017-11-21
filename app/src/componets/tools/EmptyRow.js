import React from 'react';
import {TableRowColumn, TableRow} from 'material-ui/Table';

const EmptyRow = (state) => (
	<TableRow >
		<TableRowColumn colSpan={state.col}>
			No data
		</TableRowColumn>
	</TableRow>
);

export default EmptyRow
