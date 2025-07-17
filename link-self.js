'use strict';

/* eslint-disable no-console, no-process-exit, max-len */
const fs = require('fs');
const path = require('path');
const os = require('os');

const pkgJson = require('./package.json');

const pkgName = pkgJson.name; // supports @scoped names
const targetDir = path.resolve('.');

const linkPath = path.resolve('node_modules', ...pkgName.split('/'));

// If already linked, skip
if (fs.existsSync(linkPath)) {
	const stat = fs.lstatSync(linkPath);
	if (stat.isSymbolicLink() || stat.isDirectory()) {
		console.log(`[link-self] Already linked: ${linkPath}`);
		process.exit(0);
	} else {
		console.warn(`[link-self] Warning: ${linkPath} exists and is not a symlink`);
		process.exit(1);
	}
}

if (!fs.existsSync(path.dirname(linkPath))) {
	fs.mkdirSync(path.dirname(linkPath), {recursive: true});
}

console.log(`[link-self] Linking ${targetDir} -> ${linkPath}`);

try {
	if (os.platform() === 'win32') {
		// Use junction on windows because symlinks require admin privileges for some reason (a very synergetic one of course)
		fs.symlinkSync(targetDir, linkPath, 'junction');
	} else {
		fs.symlinkSync(targetDir, linkPath, 'dir');
	}
	console.log('[link-self] Done.');
} catch (err) {
	console.error('[link-self] Failed to link:', err);
	process.exit(1);
}
/* eslint-enable no-console, no-process-exit, max-len */
