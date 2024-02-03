import { Slot, component$ } from "@builder.io/qwik";

export interface GridProps {
  rows: number;
  colunms: number;
}

export interface GridRowProps {
  index: number;
}
export interface GridColProps {
  index: number;
}
export const Grid = component$<GridProps>((props) => {
  if (props.colunms < 1 || props.rows < 1) {
    throw Error("bad def");
  }
  const elementalRow = Array(props.rows);
  return (
    <>
      <GridRow>here</GridRow>
      <GridCol> UwU</GridCol>
      {getGrid(props.colunms, props.rows)}
    </>
  );
});

const GridRow = component$<GridRowProps>((props) => {
  return (
    <>
      <div class=" border-2 border-2 border-slate-500">
        <Slot />
      </div>
    </>
  );
});

const GridCol = component$<GridColProps>((props) => {
  return (
    <div class="">
      <Slot />
    </div>
  );
});

function getGrid(cols: number, rows: number) {
  const grid = [];
  for (let index = 0; index < cols; index++) {
    let innerCol = [];
    for (let index = 0; index < rows; index++) {
      innerCol.push(<GridRow>" "</GridRow>);
    }
    grid.push(<GridCol>{innerCol}</GridCol>);
    innerCol = [];
    console.log(innerCol.length);
  }
  console.log("running");

  console.log("my leng", grid.length);
  return grid;
}
