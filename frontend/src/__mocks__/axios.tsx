const apiMock = {
    // @ts-expect-error TS(2304): Cannot find name 'jest'.
    create: jest.fn(() => ({
      // @ts-expect-error TS(2304): Cannot find name 'jest'.
      get: jest.fn(() => Promise.resolve({ data: {} })),
      // @ts-expect-error TS(2304): Cannot find name 'jest'.
      post: jest.fn(() => Promise.resolve({ data: {} })),
    })),
  };
    export default apiMock;