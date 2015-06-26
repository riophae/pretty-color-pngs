import removeDirRecursively from './lib/recursively-remove-dir.js';
import createDirStructureRecursively from './lib/recursively-create-dir-structure.js';
import generateSelectedColorImages from './lib/generate-selected-color-images.js';
import getPrettyColors from './lib/get-pretty-colors.js';

let path = require('path');

let parseColor = require('parse-color');

let filters = {};

filters.highSaturationByHSV = {
  dirName: 'high-saturation-colors',
  filterFn: (parsedColor) => {
    let [, s, v] = parsedColor.hsv;
    return v > 85 && s > 85;
  }
};

filters.highSaturationByHSL = {
  dirName: 'high-saturation-colors',
  filterFn: (parsedColor) => {
    let [, s, l] = parsedColor.hsl;
    return s > 85 && l < 85;
  }
};

let init = (filter) => {
  let outputPath = path.resolve('./dist', filter.dirName);

  let removeDistDirWorker = () => {
    return removeDirRecursively(outputPath);
  };

  let createDirStructureWorker = () => {
    let dirStructure = {
      dist: {
        [filter.dirName]: {}
      }
    };
    let rootPath = path.resolve('./');

    return createDirStructureRecursively(dirStructure, rootPath).then(() => {
      console.log('Create dir structure successfully');
    }, (err) => {
      console.error(`Error occurs while creating dir structure: ${err}`);
    });
  };

  let generateImagesWorker = () => {
    return generateSelectedColorImages(outputPath, (color) => {
      return filter.filterFn(parseColor(color));
    });
  };

  let workers = [
    removeDistDirWorker,
    createDirStructureWorker,
    generateImagesWorker
  ];

  return workers.reduce((stringOrPromise, worker) => {
    let promise = stringOrPromise === 'kick off' ?
      Promise.resolve() : stringOrPromise;

    return promise.then(worker);
  }, 'kick off');
};

init(filters.highSaturationByHSL);
