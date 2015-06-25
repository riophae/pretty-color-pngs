import generateSelectedColorImages from './lib/generate-selected-color-images.js';

let path = require('path');

export default (outputPath = './dist/all-pretty-colors') => {
  outputPath = path.resolve(outputPath);
  return generateSelectedColorImages((x) => true, outputPath);
}
