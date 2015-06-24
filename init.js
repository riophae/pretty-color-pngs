import createDirStructureRecursively from './recursively-create-dir-structure.js';
import dirStructure from './dir-structure.json';

let path = require('path');

createDirStructureRecursively(dirStructure, path.resolve('./')).then(() => {
  console.log('Init successful');
});
