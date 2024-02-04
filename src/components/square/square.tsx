import { component$, useSignal, $, useContext } from "@builder.io/qwik";
import { Grid2dArr, GridContext } from "../grid/grid";
import { log } from "util";

export interface SquarePTagProps {
  isXTurn: boolean;
  size: number;
  pos: {
    col: number;
    row: number;
  };
}
export type SquareValues = " " | "X" | "O";

export const SquarePTag = component$<SquarePTagProps>(
  ({ size, isXTurn, pos }) => {
    const grid = useContext(GridContext);
    const square = grid[pos.col][pos.row];
    // dynamic tailwind bad bad
    const className = `width:${size}px; height:${size}px;`;
    console.log(pos);

    const setSquare = $(() => {
      if (square.value !== " ") {
        return;
      }
      let strg = "O";
      if (isXTurn) {
        strg = "X";
      }
      square.value = strg as SquareValues;
    });
    return (
      <p
        style={className}
        class="flex items-center justify-center"
        onPointerDown$={setSquare}
      >
        {square.value}
      </p>
    );
  },
);
