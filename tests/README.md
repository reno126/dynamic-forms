# Test suites

Use Jest and React Testing Library for component behavior and small application contracts. Use Playwright for browser-level flows that cross routes and browser storage.

## Local commands

- `npm test -- --runInBand` runs the Jest suite once.
- `npm run test:watch` runs Jest in watch mode.
- `npm run test:e2e` runs the Playwright browser suite.

Prefer queries by accessible role, name, and label. Use a test ID only when the behavior under test has no reasonable user-facing selector. Keep browser tests focused on complete user journeys, and keep lower-level tests focused on one component or contract.
