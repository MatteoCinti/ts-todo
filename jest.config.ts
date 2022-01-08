import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  verbose: true,
  "testEnvironment": "node",
  transform: {
    '^.+\\.ts?$': 'ts-jest',
  },
  testPathIgnorePatterns: [
    'client',
    'dist'
  ],
};

export default config;
