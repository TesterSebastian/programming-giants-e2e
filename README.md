# Programming Giants E2E Test Automation

This project contains end-to-end (E2E) test automation for Coding Giants' application. It utilizes **Playwright** and **TypeScript** to ensure application reliability through automated testing.

---

## Features

- **Framework**: Playwright for E2E testing.
- **Languages**: TypeScript for scalability and strong typing.
- **Cross-browser Testing**: Ensures functionality across Chromium and Firefox.
- **Environment Management**: `.env` integration for secure configuration.
- **Modular Design**: Organized tests for modules like registration and user management.

---

## Prerequisites

- **Node.js**: Ensure Node.js (v16 or above) is installed.
- **Package Manager**: npm or yarn.

---

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/TesterSebastian/programming-giants-e2e.git
   cd programming-giants-e2e
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Configure environment variables:

   Create a `.env` file in the root directory with the following structure:

   ```env
   DB_USER=your_user
   DB_PASSWORD=your_password
   DB_SERVER=your_server
   DB_PORT=your_port
   DB_DATABASE=your_database
   ```

---

## Scripts

- **Run Tests**:

  ```bash
  npx playwright test
  ```

- **Generate HTML Report**:

  ```bash
  npx playwright show-report
  ```

- **Debug Tests**:

  ```bash
  npx playwright test --debug
  ```

---

## Project Structure

```plaintext
.
├── tests/                 # Test cases organized by module
├── playwright.config.ts   # Playwright configuration
├── .env                   # Environment variables
├── package.json           # Project metadata and dependencies
├── README.md              # Documentation
```

---

## Dependencies

### DevDependencies

- **@playwright/test**: Playwright test runner.
- **@types/node**: TypeScript definitions for Node.js.

### Dependencies

- **mssql**: Microsoft SQL Server integration.
- **@faker-js/faker**: Random data generator for test data.
- **dotenv**: Manage environment variables securely.

---

## Configuration

The `playwright.config.ts` file contains:

- Base URL for tests: `https://devtest.giganciprogramowania.edu.pl`
- Headless mode enabled.
- Timeout: 600,000ms.
- Test reporters: `list` and `html`.

Modify the `baseURL` or other configurations as needed.

---

## Contribution Guidelines

- Fork the repository.
- Make your changes on a separate branch.
- Submit a pull request for review.

---

## Issues

Report issues at [GitHub Issues](https://github.com/TesterSebastian/programming-giants-e2e/issues).

---

## License

This project is licensed under the ISC License.

---

## Author

Created by **TesterSebastian**. Feel free to reach out with questions or feedback!
