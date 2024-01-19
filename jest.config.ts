/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
	preset: 'ts-jest',
	testEnvironment: 'node',
	testPathIgnorePatterns: ['./dist/tests'],
	moduleFileExtensions: ['ts', 'tsx', 'js'],
}
