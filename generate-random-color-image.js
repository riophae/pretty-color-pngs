import generatePNGImage from './lib/generate-png-image.js';
import getPrettyColors from './lib/get-pretty-colors.js';

let path = require('path');

let prettyColors = getPrettyColors();

let colorTotalCount = prettyColors.length;
let randomColorIndex = Math.floor(Math.random() * colorTotalCount);
let randomColor = prettyColors[randomColorIndex];

generatePNGImage(randomColor, path.resolve('./dist'), 'random-color.png');
