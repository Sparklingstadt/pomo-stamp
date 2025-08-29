function sum(a: number, b: number) {
  return a + b;
}

function multiply(a: number, b: number) {
  return a * b;
}

describe('sum function', () => {
  test('adds 1 + 2 to equal 3', () => {
    expect(sum(1, 2)).toBe(3);
  });

  it("adds 2 + 3 to equal 5", () => {
    expect(sum(2, 3)).toBe(5);
  });
});

describe('multiply function', () => {
  test('multiplies 2 * 3 to equal 6', () => {
    expect(multiply(2, 3)).toBe(6);
  });

  it("multiplies 4 * 5 to equal 20", () => {
    expect(multiply(4, 5)).toBe(20);
  });
});