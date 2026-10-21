import { describe, test } from "node:test";
import assert from "node:assert";
import { mainCalculator } from "../service/calculations.js";

describe("calculation tests", () => {
  test("simple expressions", () => {
    const result1 = mainCalculator("8+8");
    assert.strictEqual(result1, 8 + 8);
    const result2 = mainCalculator("5*5");
    assert.strictEqual(result2, 5 * 5);
    const result3 = mainCalculator("8*8+9-7/5");
    assert.strictEqual(result3, 8 * 8 + 9 - 7 / 5);
  });
  test("expressions with parentheses", () => {
    const result1 = mainCalculator("8+(8+8)-9");
    assert.strictEqual(result1, 8 + (8 + 8) - 9);
    const result2 = mainCalculator("-9+(8+8*7)-9+(4-4)");
    assert.strictEqual(result2, -9 + (8 + 8 * 7) - 9 + (4 - 4));
  });
  test("division by zero", () => {
    const result1 = mainCalculator("8+(8/0)-9");
    assert.strictEqual(result1, "Error: Cannot divide by zero");
  });
  test("error cases", () => {
    const result1 = mainCalculator("8+(8/8)-(9");
    assert.strictEqual(result1, "Error: Invalid bracket");
    const result2 = mainCalculator("2+8/8+p");
    assert.strictEqual(result2, "Error: Invalid input");
  });
});
