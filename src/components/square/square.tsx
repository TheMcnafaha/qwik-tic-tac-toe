import { component$, $, useContext, createContextId } from "@builder.io/qwik";
import { BoardContext, Grid2dArr, GridContext, lastMove } from "../grid/grid";
import { Point } from "../grid/utils";

export interface SquarePTagProps {
  isXTurn: boolean;
  size: number;
  pos: Point;
}
export type SquareValues = " " | "X" | "O";
export const SquarePTag = component$<SquarePTagProps>(
  ({ size, isXTurn, pos }) => {
    const grid = useContext(GridContext);
    const board = useContext(BoardContext);
    const lastM = useContext(lastMove);
    const square = grid[pos.y][pos.x];
    // dynamic tailwind bad bad
    const className = `width:${size}px; height:${size}px;`;
    console.log(pos);
    const setSquare = $(() => {
      if (square.value !== " ") {
        return;
      }
      lastM.value = pos;
      let strg = "O";
      if (isXTurn) {
        strg = "X";
      }
      square.value = strg as SquareValues;
      board.push(grid);
    });
    return (
      <p
        style={className}
        class="flex items-center justify-center"
        onPointerDown$={setSquare}
        onKeyDown$={(e) => {
          if (e.key === " ") {
            setSquare();
          }
        }}
        tabIndex={0}
      >
        {square.value}
      </p>
    );
  },
);
