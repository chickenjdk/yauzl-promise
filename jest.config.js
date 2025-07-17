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
	// Only allow one worker and set timeout to 2 hours to run successfully on the limited ci
	...(process.env.CI && {maxWorkers: '1', testTimeout: 7200000})
};
