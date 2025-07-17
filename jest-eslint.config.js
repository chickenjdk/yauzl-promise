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
	// Only allow one worker and disable timeout to run successfully on the limited ci
	...(process.env.CI && {maxWorkers: '1', testTimeout: 0})
};
