/* --------------------
 * yauzl-promise module
 * Jest config
 * ------------------*/

'use strict';

// Exports

module.exports = {
	testEnvironment: 'node',
	coverageDirectory: 'coverage',
	collectCoverageFrom: ['index.js', 'lib/**/*.js'],
	setupFilesAfterEnv: ['jest-extended/all'],
	// Only allow one worker and disable timeout to run successfully on the limited ci
	...(process.env.CI && {maxWorkers: '1', testTimeout: 0})
};
