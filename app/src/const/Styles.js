import {
	panelUsers,
	panelSettings,
	rowStoreLabel,
	ok,
	bad
} from './Colors'

const tabUsers = {
	background: panelUsers
};
const tabSettings = {
	background: panelSettings
};

const styleDataLabel = {
	color : rowStoreLabel
};
const styleRow = {
	overflow: 'visible',
	fontSize : '16px'
};
const styleBlockInCell = {
	display : 'inline-block'
};
const styleArea = {
	width : '80%',
	marginLeft: '15px',
	fontSize : '16px'
};
const styleBlock = {
	width: '100%',
	maxWidth: 700,
	margin: 'auto'
};
const styleButtonBlock = {
	marginTop: 24,
	marginBottom: 12
};
const styleContent = {
	margin: '0 16px',
	overflow: 'hidden'
};
const styleCategoryEdit = {
	top: '23px'
};
const styleDiv = {
	display : 'block'
};
const styleTextFieldEdit = {
	width : 100
};

const styleIcon = {
	marginLeft:10
};

const styleIconEnable = {
	...styleIcon,
	color : ok
};

const styleIconDisable = {
	...styleIcon,
	color : bad
};

export {
	tabUsers,
	tabSettings,
	styleDataLabel, styleRow, styleBlockInCell, styleArea,
	styleBlock, styleButtonBlock,
	styleContent,
	styleCategoryEdit,
	styleDiv,
	styleTextFieldEdit,
	styleIconEnable,
	styleIconDisable
}
