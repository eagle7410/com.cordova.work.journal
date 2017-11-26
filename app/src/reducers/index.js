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
import {stepsDownload} from './Settings/StepsDownload'
import {stepsUpload} from './Settings/StepsUpload'


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
	stepsDownload,
	stepsUpload
});

export {reducer};
