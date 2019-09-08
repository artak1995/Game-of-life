const createGrid = (cols, rows) => {
  let colArr = new Array(cols);
  for (let i = 0; i < colArr.length; i++) {
    colArr[i] = new Array(rows);
  }
  return colArr;
}

const initGrid = () => {
  const cols = 30;
  const rows = 40;

  let grid = createGrid(cols, rows);
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      grid[i][j] = {
        // isLive: Math.round(Math.random()),
        // color: 'red',
        isLive: 0,
        color: 'white',
      };
    }
  }

  return grid;
}

export default initGrid;