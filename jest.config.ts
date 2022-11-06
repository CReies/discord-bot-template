export default {
	preset: 'ts-jest',
	testEnvironment: 'node',
	coverageDirectory: 'coverage',
	collectCoverageFrom: ['src/**/*.{js,ts}'],
	coverageThreshold: {
		global: { branches: 0, functions: 0, lines: 0, statements: 0 },
	},
	moduleNameMapper: {
		'classes/(.*)': '<rootDir>/src/classes/$1',
		'events/(.*)': '<rootDir>/src/events/$1',
		'commands/(.*)': '<rootDir>/src/commands/$1',
		'handlers/(.*)': '<rootDir>/src/handlers/$1',
	},
	moduleDirectories: ['node_modules', 'src'],
};
