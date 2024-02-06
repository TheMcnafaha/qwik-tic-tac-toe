import { expect, test } from "vitest";
import solve, { mazefier, testlol } from "./utils";
import { Grid2dArr } from "./grid";

test("adds 1 + 2 to equal 3", () => {
  expect(testlol()).toBe("working");
});

const ex1Grid = [[{value:"X"}, {value:"X"}, {value:"X"}]];
const ex2Grid= [
  [{value:"X"}, {value:"O"}, {value:"O"}],
  [{value:"X"}, {value:"O"}, {value:"O"}],
  [{value:"X"}, {value:"O"}, {value:"O"}],
];

const ex3Grid= [
  [{value:"O"}, {value:"O"}, {value:"O"}],
  [{value:"O"}, {value:"O"}, {value:"O"}],
  [{value:"O"}, {value:"O"}, {value:"O"}],
];
const ex4Grid= [
  [{value:"X"}, {value:"O"}, {value:"O"}],
  [{value:"X"}, {value:"X"}, {value:"X"}],
  [{value:"O"}, {value:"O"}, {value:"O"}],
];
test("work algo", ()=>{
  // mazefier(ex1Grid,"X")
  // expect( mazefier(ex1Grid)).toBe(2)
  const lol=solve(ex1Grid as Grid2dArr,"O","X",{x:0,y:0})
  const lol2=solve(ex2Grid as Grid2dArr,"O","X",{x:0,y:1})
  const lol3=solve(ex3Grid as Grid2dArr,"O","X",{x:0,y:1})
  const lol4=solve(ex4Grid as Grid2dArr,"O","X",{x:0,y:0})
  console.log(lol);
  console.log(lol2);
  console.log(lol3);
  console.log(lol4);
  expect(lol.length).toBe(3)
  expect(lol2.length).toBe(3)
  expect(lol3.length).toBe(0)
  expect(lol4.length).toBe(3)
  
})
