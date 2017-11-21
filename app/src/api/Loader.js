
const fullData = async () => {

	const db = window.cordova.db;

	const users = await db.getAll('users');

	const projects = await db.getAll('projects');

	let dataProjects = {};
	projects.map(project => dataProjects[project.id] = project.name);

	const storage = await db.getAll('storage');

	const settings = await db.getAll('settings');
	let dataSett = {};
	settings.map(sett => dataSett[sett.type] = JSON.parse(sett.data));

	return {
		projects : dataProjects,
		settings : dataSett,
		storage : storage,
		users : users
	};
};

export {fullData};
