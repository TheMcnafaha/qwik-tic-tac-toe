import { expect, test } from "vitest";
import { testlol } from "./utils";

test("adds 1 + 2 to equal 3", () => {
  expect(testlol()).toBe("working");
});
