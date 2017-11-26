import AlertStatus from '../const/AlertStatus'
import {fullData} from './Loader'

/**
 * @type {BrowserDataBaseClass|*}
 */
const db = function () {
	return window.cordova.db;
};

const fileJson = 'data.json';

const uploadBinary = async (state, binary) => {
	let fileZip = 'data-task-json-test.zip';

	if (window.resolveLocalFileSystemURL) {
		function writeFile(fileEntry, dataObj) {
			// Create a FileWriter object for our FileEntry (log.txt).
			fileEntry.createWriter(function (fileWriter) {

				fileWriter.onwriteend = function() {
					state.next();
					state.showAlert("File write to: " +fileEntry.fullPath, AlertStatus.OK);
				};

				fileWriter.onerror = function (e) {
					state.stop();
					state.showAlert("Failed file write: " + e.toString(), AlertStatus.BAD);
				};

				// If data object is not passed in,
				// create a new Blob instead.
				if (!dataObj) {
					dataObj = new Blob(['some file data'], { type: 'text/plain' });
				}

				fileWriter.write(dataObj);
			});
		}

		let filePaths = window.cordova.file;
		window.resolveLocalFileSystemURL( (filePaths.documentsDirectory || filePaths.externalRootDirectory),
			function(dirEntry) {
				dirEntry.getFile(fileZip, { create: true, exclusive: false }, function (fileEntry) {
					writeFile(fileEntry, binary);
				})
			}
		);
	} else {
		let blob = new Blob([binary], {'type': 'application/octet-stream' });
		let url = window.URL.createObjectURL(blob);

		let a = document.createElement('a');
		a.href = url;
		a.download = fileZip;
		a.click();
		state.next();
	}
};

const getDataJsonFile = async (state) => {
	try {
		/**
		 * @type {BrowserDataBaseClass|*}
		 */
		let database = db();

		let users = await database.getAll('users');
		let store = await database.getAll('storage');
		let projects = await database.getAll('projects');
		let projectObj = {};

		projects.map(cat => projectObj[cat.id] = cat.name);

		let data = {
			users : users,
			store : store,
			projects : projectObj
		};

		let zipper = new window.JSZip();

		let zip = await zipper.file(fileJson, JSON.stringify(data));

		let blob = await  zip.generateAsync({type:"blob"});

		uploadBinary(state, blob);

		state.next();

	} catch (err) {
		console.log('err ', err);
		state.stop();
		state.showAlert((err.message || (err.target && err.target.error.message ) || err), AlertStatus.BAD);
	}
}

const updateApp   = async (state) => {
	try {
		let mergedData = await fullData();

		['Projects', 'Users', 'Storage'].forEach(
			p => state[`init${p}`](mergedData[p.toLowerCase()])
		);

		state.next();
		state.showAlert('Migrate data from json file is success :)', AlertStatus.OK);
	} catch (err) {
		console.log('err ', err);
		state.stop();
		state.showAlert((err.message || (err.target && err.target.error.message ) || err), AlertStatus.BAD);
	}
};

const migrateData = async (state, data) => {
	try {
		/**
		 * @type {BrowserDataBaseClass|*}
		 */
		let database = db();

		for(let catId in  data.projects) {
			catId = Number(catId);

			let cat = await database.getByPk('projects', catId);

			if (!cat) {
				await database.insert('projects', ['id', 'name'], [catId, data.projects[catId] ]);
			}
		}

		for(let user of  data.users) {
			let us = await database.getByRequire('users', 'login', user.login);

			if (!us) {
				await database.insert('users', ['login', 'pass'], [user.login, user.pass])
			}

		}

		for(let record of  data.store) {
			let rec = await database.getByRequire('storage', 'task', record.task);

			if (rec) {
				for(let prop in  record) {
					if (prop === 'id') continue;
					rec[prop] = record[prop];
				}

				await database.updateByPk('storage', rec.id, rec);
			} else {

				await database.insert(
					'storage',
					[ 'task', 'project', 'hours', 'hours_fact', 'date_doit', 'comment'],
					[
						record.task,
						record.project,
						record.hours,
						record.hours_fact,
						record.date_doit,
						record.comment
					]
				);
			}
		}

		updateApp(state);

		state.next();

	} catch (err) {
		console.log('err ', err);
		state.stop();
		state.showAlert((err.message || (err.target && err.target.error.message ) || err), AlertStatus.BAD);
	}

};

const extractArchiveAndMigrate = async (state, binary) => {
	try {
		let zipper = new window.JSZip();

		let zip = await zipper.loadAsync(binary);
		let file = zip.file(fileJson);

		if (!file) {
			throw new Error('Archive No have data.json file')
		}

		let text = await file.async("string");

		if (!text) {
			throw new Error('Data in data.json is empty');
		}

		let data = JSON.parse(text);

		migrateData(state, data);

		state.next();

	} catch (err) {
		console.log('err ', err);
		state.stop();
		state.showAlert((err.message || (err.target && err.target.error.message ) || err), AlertStatus.BAD);
	}

};

export {
	extractArchiveAndMigrate,
	getDataJsonFile,
};
