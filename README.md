# TDD Setup TS

This repository serves as a starting point for practicing test-driven development in TypeScript. It is intended to be used with exercises like code katas, but can be used for anything else as well.

## Run Tests

The setup uses Vitest as test runner which supports watch mode for testing. It picks up any files with the *.test.ts or *.spec.ts endings in the repository. To run the tests, use the following commands:

```bash
# run all tests in watch mode
npm test

# run all tests once
npm run test:once

# run all tests once with coverage
npm run test:coverage
```

## Run TypeScript app

The TypeScript code can be run directly via vite-node. This is nice for local testing but not ideal for production environments. To run the typescript app, use the following command:

```bash
npm start
```

## Build and Run JavaScript app

Before the code can be run natively, it needs to be compiled. The compilation generates the JavaScript files into the `dist/` folder. Use the following commands to build and run the app:

```bash
### compile TypeScript to JavaScript
npm run build

### run compiled JavaScript
node dist/
```