import { expect, test } from "vitest";
import { mazefier, testlol } from "./utils";
import { Grid2dArr } from "./grid";

test("adds 1 + 2 to equal 3", () => {
  expect(testlol()).toBe("working");
});

const ex1Grid = [[{value:"X"}, {value:"X"}, {value:"X"}]];

test("work algo", ()=>{
  mazefier(ex1Grid,"X")
  // expect( mazefier(ex1Grid)).toBe(2)
})
