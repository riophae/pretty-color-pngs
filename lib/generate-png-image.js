let fs = require('fs');
let path = require('path');

let PNG = require('pngjs').PNG;

let generatePNG = (config) => {
	let png = new PNG({
		width: config.size,
		height: config.size,
		filterType: -1
	});

	return Promise.resolve().then(() => {
		for (let y = 0; y < png.height; y++) {
			for (let x = 0; x < png.width; x++) {
				let idx = (png.width * y + x) << 2;

				png.data[idx  ] = config.colorRGB[0];
				png.data[idx+1] = config.colorRGB[1];
				png.data[idx+2] = config.colorRGB[2];
				png.data[idx+3] = 0xff;
			}
		}
	}).then(() => {
		png.pack().pipe(fs.createWriteStream(config.outputPath));
	});
}

export default (color, outputPath, fileName = `${color.toUpperCase()}.png`) => {
	let config = {
		colorRGB: color.match(/(.{2})/g).map(str => parseInt(str, 16)),
		outputPath: path.join(outputPath, fileName),
		size: 256
	};

	return generatePNG(config);
};
