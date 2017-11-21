import React from 'react';
import MenuItem from 'material-ui/MenuItem';
import DropDownMenu from 'material-ui/DropDownMenu';

const DropDownList = (state) => {
	const list = state.list;
	const menu = list.map(
		(val, inx) => <MenuItem value={val} key={(state.keyPrev || 'dropDownList') + inx } primaryText={val} />
	);

	return <DropDownMenu
		style={state.style}
		value={state.val}
		onChange={state.onEdit}
		disabled={state.disable || false}
	>{menu}</DropDownMenu>;
}

export default DropDownList;
