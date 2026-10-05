import type { Config } from 'jest';
import nextJest from 'next/jest.js';

const createJestConfig = nextJest({
    dir: './',
});

const config: Config = {
    coverageProvider: 'v8',
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
    roots: ['<rootDir>/tests'],
    testPathIgnorePatterns: ['<rootDir>/tests/e2e/'],
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1',
        '^nanoid$': '<rootDir>/node_modules/nanoid/index.cjs',
    },
};

export default createJestConfig(config);

