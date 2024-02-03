import { Slot, component$ } from "@builder.io/qwik";

export interface GridProps {
  rows: number;
  colunms: number;
}

export interface GridRowAndColProps {
  index: number;
  max: number;
}
export const Grid = component$<GridProps>((props) => {
  if (props.colunms < 1 || props.rows < 1) {
    throw Error("bad def");
  }
  return <>{getGrid(props.colunms, props.rows)}</>;
});

const GridRow = component$<GridRowAndColProps>((props) => {
  let className = "border-b-2 border-slate-500";
  if (props.index >= props.max - 1) {
    className = "";
  }
  return (
    <>
      <div class={className}>
        <Slot />
      </div>
    </>
  );
});

const GridCol = component$<GridRowAndColProps>((props) => {
  let className = "border-r-2 border-slate-500";

  if (props.index >= props.max - 1) {
    className = "";
  }
  return (
    <div class={className}>
      <Slot />
    </div>
  );
});

function getGrid(cols: number, rows: number) {
  const grid = [];
  for (let cIndex = 0; cIndex < cols; cIndex++) {
    let innerCol = [];
    for (let rIndex = 0; rIndex < rows; rIndex++) {
      innerCol.push(
        <GridRow index={rIndex} max={rows}>
          " "
        </GridRow>,
      );
    }
    grid.push(
      <GridCol index={cIndex} max={cols}>
        {innerCol}
      </GridCol>,
    );
    innerCol = [];
    console.log(innerCol.length);
  }
  console.log("running");

  console.log("my leng", grid.length);
  return grid;
}
