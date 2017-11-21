const prefix = 'storage';

const Storage = {
	init       : `${prefix}Init`,
	move       : `${prefix}OnDelete`,
	moveCancel : `${prefix}OnCancelDelete`,
	modeEdit   : `${prefix}OnModeEdit`,
	editClear  : `${prefix}OnEditClear`,
	edit       : `${prefix}OnEdit`,
	saved      : `${prefix}OnSaveEdit`,
	change     : `${prefix}OnEdit`,
	changePage : `${prefix}OnChangePage`,
	changeCountInPage : `${prefix}OnChangeCountInPage`
};

export default Storage;
