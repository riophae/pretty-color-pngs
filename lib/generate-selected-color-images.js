import generatePNGImage from './generate-png-image.js';
import getPrettyColors from './get-pretty-colors.js';

let prettyColors = getPrettyColors();
let selectedColors;
let outputPath;

let generate = function* () {
  let index = 0;
  let totalCount = selectedColors.length;

  while (index++ < totalCount - 1) {
    let color = selectedColors[index];

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

  return promise.then(() => {
    console.log(`${item.value} images generated successfully.`);
  });
};

export default (filterFn, pathStr) => {
  selectedColors = prettyColors.filter(filterFn);
  outputPath = pathStr;

  return init();
};
