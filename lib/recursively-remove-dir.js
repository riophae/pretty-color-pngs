let rmrf = require('spawn-rmrf');

export default (dir) => {
  return new Promise((resolve, reject) => {
    rmrf(dir, (code) => {
      if (code !== 0) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
};
