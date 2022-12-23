export const add = (a: number, b: number): number => a + b;

describe("add", () => {
  it("1 + 2 = 3", () => {
    const result = add(1, 2);

    expect(result).toBe(3);
  });
});
