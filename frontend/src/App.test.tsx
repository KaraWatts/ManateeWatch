
// @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test('jest test', () => {
  const a = 2;
  const b = 5;

  const result = a + b;

  // @ts-expect-error TS(2304): Cannot find name 'expect'.
  expect(result).toBe(7)
});