/* --------------------
 * yauzl-promise module
 * Tests ESLint config
 * ------------------*/

'use strict';

// Exports

module.exports = {
	extends: [
		'@overlookmotel/eslint-config-jest'
	],
	rules: {
		'import/no-unresolved': ['error', {ignore: ['^@chickenjdk/yauzl-promise$'], commonjs: true}]
	}
};
