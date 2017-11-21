const textField = ['task', 'hours', 'hours_fact' ];
const getRecord = (id, store) => {
	let record = {};
	['project', 'comment', 'date_doit'].concat(textField).map(field => record[field] = store[field]);

	if (id) {
		record._id = id;
	}

	return record;
};

export {textField, getRecord};
