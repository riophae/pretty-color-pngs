import generatePNGImage from './lib/generate-png-image.js';

let path = require('path');

let prettyColors = Object.keys(require('pretty-colors'));

let generate = function* () {
  let index = 0;
  let outputPath = path.resolve('./dist/all-pretty-colors');
  let totalCount = prettyColors.length;

  while (index++ < totalCount - 1) {
    let color = prettyColors[index];

    yield () => {
      return generatePNGImage(color, outputPath)
    };
  }

  return totalCount;
};

let init = () => {
  let worker = generate();
  let item = worker.next();
  let promise = item.value();

  while (!item.done) {
    item = worker.next();
    promise = promise.then(item.value);
  }

  promise.then(() => {
    console.log(`${item.value} images generated successfully.`);
  });
};

init();
