import {save, move, update, reqFull, get} from '../utils/Req'
import Routes from '../const/apiRoutes'

const getPath           = data => console.log('getPath', data);
const setConfigFile     = data => console.log('setConfigFile', data);
const initConnect       = data => console.log('initConnect', data);
const postArchive       = data => console.log('postArchive', data);
const getArchive        = data => console.log('getArchive', data);
const putCloudArchive   = data => console.log('putCloudArchive', data);
const extractArchive    = date => console.log('extractArchive', date);
const mergeArchive      = date => console.log('mergeArchive', date);
const clearArchive      = date => console.log('clearArchive', date);

export {
	getPath,
	setConfigFile,
	initConnect,
	postArchive,
	putCloudArchive,
	getArchive,
	extractArchive,
	mergeArchive,
	clearArchive,
};
