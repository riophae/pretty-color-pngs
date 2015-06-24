import createDirStructureRecursively from './recursively-create-dir-structure.js';
import dirStructure from './dir-structure.json';

createDirStructureRecursively(dirStructure).then(() => {
	console.log('Init successful');
});
