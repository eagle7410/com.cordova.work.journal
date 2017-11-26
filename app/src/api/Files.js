import AlertStatus from '../const/AlertStatus'

const download =(state, content, filename, contentType = 'application/octet-stream') => {
	if (window.resolveLocalFileSystemURL) {
		function writeFile(fileEntry, content) {
			// Create a FileWriter object for our FileEntry (log.txt).
			fileEntry.createWriter(function (fileWriter) {

				fileWriter.onwriteend = function() {
					state.showAlert("File write to: " +fileEntry.fullPath, AlertStatus.OK);
				};

				fileWriter.onerror = function (e) {
					state.showAlert("Failed file write: " + e.toString(), AlertStatus.BAD);
				};

				// If data object is not passed in,
				// create a new Blob instead.
				var dataObj = new Blob([content], { type: 'text/plain' });

				fileWriter.write(dataObj);
			});
		}

		let filePaths = window.cordova.file;
		window.resolveLocalFileSystemURL( (filePaths.documentsDirectory || filePaths.externalRootDirectory),
			function(dirEntry) {
				dirEntry.getFile(filename, { create: true, exclusive: false }, function (fileEntry) {
					writeFile(fileEntry, content);
				})
			}
		);
	} else {
		var a = document.createElement('a');
		var blob = new Blob([content], {'type':contentType});
		a.href = window.URL.createObjectURL(blob);
		a.download = filename;
		a.click();
	}

};

export {download};
