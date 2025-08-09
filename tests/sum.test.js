function sum(a, b) {
  return a + b;
}

module.exports = sum;

test('sum function', () => {
  expect(sum(1, 2)).toBe(3);
});