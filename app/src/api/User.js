import CryptoJS from 'crypto-js';

const table = 'users';
/**
 * @type {BrowserDataBaseClass}
 */
const db = function () {
	return window.cordova.db;
};

const add = async data => {
	let database = db();

	let hash = CryptoJS.HmacSHA256(data.pass, "IgorStcherbina");
	data.pass = hash.toString(CryptoJS.enc.Hex);

	await  database.upInsert(table, data);

	let ins = await database.getByRequire(table, 'login', data.login);

	return ins;
};

const edit = async data => {
	let database = db();
	let rec = await database.getByPk(table, Number(data.id));

	rec.login = data.login;

	database.updateByPk(table, data.id, rec);

	return rec;
};

const del = id => db().removeByPk(table, Number(id));

export {add, edit, del};
