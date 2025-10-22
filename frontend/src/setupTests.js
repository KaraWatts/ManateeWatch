// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
require('@testing-library/jest-dom');

global.Request = jest.fn().mockImplementation(() => ({
    signal: {
      aborted: false,
      // addEventListener and removeEventListener as needed
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
    },
  }));