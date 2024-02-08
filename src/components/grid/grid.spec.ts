import { expect, test } from "vitest";
import {  testlol,solve } from "./utils";
import { Grid2dArr } from "./grid";

test("adds 1 + 2 to equal 3", () => {
  expect(testlol()).toBe("working");
});


test("work algo", ()=>{
const ex1Grid = [[{value:"X"}, {value:"X"}, {value:"X"}]];
  const lol=solve(ex1Grid as Grid2dArr,"O","X",{x:0,y:0})
  console.log(lol);
  expect(lol.length).toBe(3)
  
})
test("work algo", ()=>{
const ex2Grid= [
  [{value:"X"}, {value:"O"}, {value:"O"}],
  [{value:"X"}, {value:"O"}, {value:"O"}],
  [{value:"X"}, {value:"O"}, {value:"O"}],
];
  const lol2=solve(ex2Grid as Grid2dArr,"O","X",{x:0,y:1})
  console.log(lol2);
  expect(lol2.length).toBe(3)
  
})
test("work algo", ()=>{
const ex3Grid= [
  [{value:"O"}, {value:"O"}, {value:"O"}],
  [{value:"O"}, {value:"O"}, {value:"O"}],
  [{value:"O"}, {value:"O"}, {value:"O"}],
];
  const lol3=solve(ex3Grid as Grid2dArr,"O","X",{x:0,y:1})
  console.log(lol3);
  expect(lol3.length).toBe(0)
  
})
test("work algo", ()=>{
const ex4Grid= [
  [{value:"X"}, {value:"O"}, {value:"O"}],
  [{value:"X"}, {value:"X"}, {value:"X"}],
  [{value:"O"}, {value:"O"}, {value:"O"}],
];
  const lol4=solve(ex4Grid as Grid2dArr,"O","X",{x:0,y:0})
  console.log(lol4);
  expect(lol4.length).toBe(3)
  })

test("work algo", ()=>{
const ex5Grid= [
  [{value:"X"}, {value:"O"}, {value:"O"}],
  [{value:"X"}, {value:"X"}, {value:"X"}],
  [{value:"O"}, {value:"O"}, {value:"X"}],
];
  const lol5=solve(ex5Grid as Grid2dArr,"O","X",{x:0,y:0})
  console.log(lol5);
  expect(lol5.length).toBe(3)
  })
test("work algo", ()=>{
const ex5Grid= [
  [{value:"X"}, {value:"O"}, {value:"O"}],
  [{value:"X"}, {value:"X"}, {value:"X"}],
  [{value:"O"}, {value:"O"}, {value:"X"}],
];
  const lol5=solve(ex5Grid as Grid2dArr,"O","X",{x:2,y:2})
  console.log(lol5);
  expect(lol5.length).toBe(3)
  })
test("work algo", ()=>{
const ex5Grid= [
  [{value:"X"}, {value:"O"}, {value:"O"}],
  [{value:"X"}, {value:"X"}, {value:"X"}],
  [{value:"O"}, {value:"O"}, {value:"X"}],
];
  const lol5=solve(ex5Grid as Grid2dArr,"O","X",{x:1,y:1})
  console.log(lol5);
  expect(lol5.length).toBe(3)
  })

test("work algo", ()=>{
const ex5Grid= [
  [{value:"O"}, {value:"O"}, {value:"X"}],
  [{value:"O"}, {value:"X"}, {value:"X"}],
  [{value:"X"}, {value:"O"}, {value:"O"}],
];
  const lol5=solve(ex5Grid as Grid2dArr,"O","X",{x:2,y:0})
  console.log(lol5);
  expect(lol5.length).toBe(3)
  })
test("work algo", ()=>{
const ex5Grid= [
  [{value:"O"}, {value:"O"}, {value:"X"}],
  [{value:"O"}, {value:"X"}, {value:"X"}],
  [{value:"X"}, {value:"O"}, {value:"O"}],
];
  const lol5=solve(ex5Grid as Grid2dArr,"O","X",{x:0,y:2})
  console.log(lol5);
  expect(lol5.length).toBe(3)
  })
test("work algo", ()=>{
const ex5Grid= [
  [{value:"O"}, {value:"O"}, {value:"X"}],
  [{value:"O"}, {value:"X"}, {value:"X"}],
  [{value:"X"}, {value:"O"}, {value:"O"}],
];
  const lol5=solve(ex5Grid as Grid2dArr,"O","X",{x:1,y:1})
  console.log(lol5);
  expect(lol5.length).toBe(3)
  })
test("work algo", ()=>{
const exGrid= [
  [{value:" "}, {value:" "}, {value:" "}],
  [{value:" "}, {value:"X"}, {value:"X"}],
  [{value:"X"}, {value:" "}, {value:" "}],
];
  const lol5=solve(exGrid as Grid2dArr,"O","X",{x:1,y:1})
  console.log(lol5);
  expect(lol5.length).toBe(3)
  })
