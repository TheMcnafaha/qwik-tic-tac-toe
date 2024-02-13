import { createContextId, PropsOf, type Signal } from "@builder.io/qwik";
import { SquareValues } from "../square/square";
import { Point } from "./utils";

export type Grid1DArr = Signal<SquareValues>[];
export type Grid2dArr = Array<Grid1DArr>;
export type Board = Grid2dArr[];
export type GridElem = Signal<Element | undefined>[][];
export const BoardContext = createContextId<Board>("board.context");
export const GridContext = createContextId<Grid2dArr>("grid.context");
export const PlayerStrgContext =
  createContextId<Signal<"X" | "O">>("isX.context");
export const LastMoveContext = createContextId<Signal<Point>>("lastM.context");
export const GameWContext = createContextId<Signal<boolean>>("GameW.Context");
export const GridElemContext = createContextId<GridElem>("GridE.context");
