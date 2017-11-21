import { routerReducer } from 'react-router-redux';
import {combineReducers} from 'redux';
import {recordAdd} from './Storage/RecordAdd';
import {storage} from './Storage/Storage';
import {storageFilters} from './Storage/Filters';
import {storageProjects} from './Storage/Projects';
import {storagePagination} from './Storage/Pagination'
import {dataConfirm} from './Confirm';
import {users} from './Users/Users';
import {login} from './Login';
import {navMenu} from './NavMenu';
import {alert} from './Alert'
import {dataLoader} from './DataLoader'
import {dropBoxSettingsForm} from './Settings/DropBoxSettingsForm'
import {dropBoxStepsUpload} from './Settings/DropBoxStepsUpload'
import {dropBoxStepsDownload} from './Settings/DropBoxStepsDownload'
import {googleSettingsForm} from './Settings/GoogleSettingsForm'
import {googleStepsUpload} from './Settings/GoogleStepsUpload'
import {googleStepsDownload} from './Settings/GoogleStepsDownload'

const reducer = combineReducers({
	routing: routerReducer,
	recordAdd,
	login,
	users,
	storage,
	storageFilters,
	storageProjects,
	storagePagination,
	alert,
	dataConfirm,
	dataLoader,
	navMenu,
	dropBoxSettingsForm,
	dropBoxStepsUpload,
	dropBoxStepsDownload,
	googleSettingsForm,
	googleStepsUpload,
	googleStepsDownload
});

export {reducer};
