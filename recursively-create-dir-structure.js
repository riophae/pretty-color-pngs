let fs = require('fs');

let createDir = (path, promise) => {
	return promise.then(() => {
		return new Promise((resolve) => {
			fs.exists(path, (exists) => {
				resolve(exists);
			});
		}).then((exists) => {
			if (!exists) {
				return new Promise((resolve, reject) => {
					fs.mkdir(path, (err) => {
						if (err) {
							reject(err);
						} else {
							resolve();
						}
					});
				});
			}
		});
	});
};

let recurse = (obj, parentDirPath, promise) => {
	return promise.then(() => {
		for (let key in obj) if (obj.hasOwnProperty(key)) {
			let dirPath = parentDirPath + '/' + key;
			recurse(obj[key], dirPath, createDir(dirPath, promise));
		}
	});
};

export default (dirStructure) => {
	return recurse(dirStructure, __dirname, Promise.resolve()).catch((err) => {
		console.error(`Uncaught error while creating dir structure: ${error}`);
		throw err;
	});
};
