import {DateToString} from '../utils/Date'
import {download} from './Files'

const formatData = data => {
    data.date_doit = DateToString(data.date_doit);

	return data;
};

const table = 'storage';
/**
 * @type {BrowserDataBaseClass}
 */
const db = function () {
	return window.cordova.db;
};

const list = async ()   => {
	return db.getAll(table);
};


const edit = async data => {
	await db().upInsert(table, data);

	return true;
};

const del = async id => {
	await db().removeByPk(table, Number(id));

	return true;
};

const addRecord = async data => {
	let database = db();

	await database.upInsert(table, formatData(data));

	let newData = await database.getByRequire(table, 'task', data.task);

	return newData;
};

const dataToCsv  = (data, fileName) => {

	let content = `Task number;Project;Hours;Comment\n`;

	for (let day in data) {
		let dataDay = data[day];
		content += `Date doit ${day};;;\n`;
		content += dataDay.tasks.map(task => `Task #${task.task};${task.project};Hours ${task.hours};"${task.comment.replace(/"/g,'\\"')}"\n`).join('');
	}

	download(content, fileName);
};

export {addRecord, edit, del, list, dataToCsv};
