/* --------------------
 * yauzl-promise module
 * Jest ESLint runner config
 * ------------------*/

'use strict';

// Exports

module.exports = {
	testEnvironment: 'node',
	runner: 'jest-runner-eslint',
	testMatch: ['<rootDir>/**/*.(js|cjs|mjs|jsx)'],
	// Only allow one worker and set timeout to 2 hours to run successfully on the limited ci
	...(process.env.CI && {maxWorkers: '1', testTimeout: 7200000})
};
