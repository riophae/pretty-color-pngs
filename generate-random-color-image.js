import generatePNGImage from './lib/generate-png-image.js';

let path = require('path');

let prettyColors = Object.keys(require('pretty-colors'));

let colorTotalCount = prettyColors.length;
let randomColorIndex = Math.floor(Math.random() * colorTotalCount);
let randomColor = prettyColors[randomColorIndex];

generatePNGImage(randomColor, path.resolve('./dist'), 'random-color.png');
