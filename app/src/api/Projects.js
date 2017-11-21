import {save, move, update, reqFull} from '../utils/Req'
import Routes from '../const/apiRoutes'
const type = Routes.prj;

/**
 * @type {BrowserDataBaseClass}
 */
const db = function () {
	return window.cordova.db;
};

const table = 'projects';

const add  = async name => {
	/**
	 * @type {BrowserDataBaseClass|*}
	 */
	let database = db();

	await database.insert(table, ['name'], [name]);

	let ins = await database.getByRequire(table, 'name', name);

	return ins;

};

const del  = async id => {
	await db().removeByPk(table, Number(id));
	return true;
};

const edit = async (id, name) => {
	id = Number(id);
	await db().updateByPk(table, id, {id : id, name : name});
	return true;
};

export {add, del, edit};

