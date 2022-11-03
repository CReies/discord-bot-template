export default {
	preset: 'ts-jest',
	testEnvironment: 'node',
	coverageDirectory: 'coverage',
	collectCoverageFrom: ['src/**/*.{js,ts}'],
	coverageThreshold: {
		global: { branches: 0, functions: 0, lines: 0, statements: 0 },
	},
	moduleNameMapper: {
		'src/(.*)': '<rootDir>/src/$1',
		'math/(.*)': '<rootDir>/src/math/$1',
	},
	moduleDirectories: ['node_modules', 'src'],
};
