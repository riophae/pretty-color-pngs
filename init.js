import createDirStructureRecursively from './recursively-create-dir-structure.js';
import dirStructure from './dir-structure.json';
import generateAllColorImages from './generate-all-color-images.js';

let path = require('path');
let fs = require('fs');

let removeDistDir = () => {
  return new Promise((resolve, reject) => {
    fs.rmdir('./dist', (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
};

let initDirStructure = () => {
  return createDirStructureRecursively(
    dirStructure,
    path.resolve('./')
  ).then(() => {
    console.log('Init successful');
  });
};

let generateImages = () => {
  return generateAllColorImages();
};

let init = () => {
  let workers = [
    // removeDistDir,
    initDirStructure,
    generateImages
  ];

  let workerPromise = workers.reduce((stringOrPromise, worker) => {
    let promise = stringOrPromise === 'kick off' ?
      Promise.resolve() : stringOrPromise;

    let nextPromise = promise.then(() => {
      return worker();
    });

    return nextPromise;
  }, 'kick off');

  workerPromise.then(() => {
    console.log('All tasks done!');
  }, (err) => {
    console.error(`Uncaught error: ${err}`);
  });
};

init();
