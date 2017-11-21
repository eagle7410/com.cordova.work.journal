/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
	// Application Constructor
	initialize: function () {
		document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);

		if (!window.cordova) {
			this.receivedEvent('deviceready');
		}
	},

	// deviceready Event Handler
	//
	// Bind any cordova events here. Common events are:
	// 'pause', 'resume', etc.
	onDeviceReady: function () {
		this.receivedEvent('deviceready');
	},

	// Update DOM on a Received Event
	receivedEvent: function (id) {
		var that = this;

		that._db = new window.BrowserDataBaseClass({name: 'work_journal'});
		if (!window.cordova) {
			window.cordova = {};
		}

		window.cordova.db = that._db;

		that._db.init(that._db_struct())
			.then(function () {
				return that._db.getAll('users');
			})
			.then(function (users) {

				if (users.length) {
					return that.runReact();
				}

				return that._db.insert('users', ['_id', 'login', 'pass'], [1, 'test', '52c453a352e11c94ea95f4a6ac4c1354bd762f6e57dbcd54012f50684be17694'])
					.then(function () {
						return that._db.insert('categories', ['id', 'name'], [
							[2, 'All Categories'],
							[3, 'Unknown']
						])
					})
					.then(function () {
						that.runReact();
					})
					.catch(that._catch);
			})
			.catch(that._catch);
	},
	_catch : function (err) {
		console.log('Error :', err);
	},
	_db_struct: function () {
		var that = this;
		var constant = that._db.queryConst();

		return {
			users: {
				_id: {
					type: constant.TYPE_INT,
					pk: {
						order: constant.ASC
					}
				},
				login: {
					type: constant.TYPE_CHAR + '(20)',
					require: true,
					unique: true
				},
				pass: {
					type: constant.TYPE_CHAR
				}
			},
			settings: {
				id: {
					type: constant.TYPE_INT,
					pk: {
						order: constant.ASC
					}
				},
				type: {
					type: constant.TYPE_CHAR + '(20)',
					require: true,
					unique: true
				},
				data: {type: constant.TYPE_TEXT}
			},
			projects: {
				id: {
					type: constant.TYPE_INT,
					pk: {
						order: constant.ASC
					}
				},
				name: {
					type: constant.TYPE_CHAR + '(100)',
					require: true,
					unique: true
				},
			},
			storage: {
				id: {
					type: constant.TYPE_INT,
					pk: {
						order: constant.ASC
					}
				},
				project: {
					type: constant.TYPE_INT,
					require: true
				},
				date_doit: {
					type: constant.TYPE_CHAR + '(10)',
					require: true
				},
				task: {
					type: constant.TYPE_INT,
					require: true
				},
				hours: {
					type: constant.TYPE_DOUBLE,
					require: true
				},
				hours_fact: {
					type: constant.TYPE_DOUBLE,
				},
				comment : {type: constant.TYPE_TEXT}
			}
		};
	},
	runReact: function () {
		if (!window.cordova) {
			window.appReact();
		} else {
			window.cordova.appReact();
		}
	}

};

app.initialize();
