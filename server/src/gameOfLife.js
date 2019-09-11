import cloneDeep from 'lodash/cloneDeep';
import uniq from 'lodash/uniq';
import { averageColor } from './utils';

const cols = 20;
const rows = 30;

const createGrid = (cols, rows) => {
  let colArr = new Array(cols);
  for (let i = 0; i < colArr.length; i++) {
    colArr[i] = new Array(rows);
  }
  return colArr;
}

export const initGrid = () => {

  let grid = createGrid(cols, rows);
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      grid[i][j] = {
        isLive: false,
        color: '#000000',
      };
    }
  }

  return grid;
}

export const nextGeneration = (grid) => {

  const nextGrid = cloneDeep(grid);
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {

      let neighbors = [];

      // ignore edges
      if (i == 0 || i == cols - 1 || j == 0 || j == rows - 1) {
        continue;
      } else {
        if (grid[i - 1][j - 1].isLive) { neighbors.push(grid[i - 1][j - 1].color); }
        if (grid[i - 1][j].isLive) { neighbors.push(grid[i - 1][j].color); }
        if (grid[i - 1][j + 1].isLive) { neighbors.push(grid[i - 1][j + 1].color); }
        if (grid[i][j - 1].isLive) { neighbors.push(grid[i][j - 1].color); }
        if (grid[i][j + 1].isLive) { neighbors.push(grid[i][j + 1].color); }
        if (grid[i + 1][j - 1].isLive) { neighbors.push(grid[i + 1][j - 1].color); }
        if (grid[i + 1][j].isLive) { neighbors.push(grid[i + 1][j].color); }
        if (grid[i + 1][j + 1].isLive) { neighbors.push(grid[i + 1][j + 1].color); }
      }


      // cell go through edges
      // neighbors = countNeighbours(grid, i, j);

      // Game of Life Rules
      if (!grid[i][j].isLive && neighbors.length === 3) {
        const removeDuplicateNeighbors = uniq(neighbors);

        let color = '';
        if (removeDuplicateNeighbors.length == 2) {
          color = averageColor(removeDuplicateNeighbors[0], removeDuplicateNeighbors[1]);
        } else if (removeDuplicateNeighbors.length == 3) {
          color = removeDuplicateNeighbors[Math.floor(Math.random() * 3)]
        } else {
          color = neighbors[0];
        }

        nextGrid[i][j].isLive = true;
        nextGrid[i][j].color = color;

      } else if (grid[i][j].isLive && (neighbors.length < 2 || neighbors.length > 3)) {
        nextGrid[i][j].isLive = false;
      }

    }
  }

  return nextGrid;

};

const countNeighbours = (grid, x, y) => {
  let neighbors = 0;
  for (let i = -1; i < 2; i++) {
    for (let j = -1; j < 2; j++) {
      const col = (x + i + cols) % cols;
      const row = (y + j + rows) % rows;
      neighbors += grid[col][row].isLive;
    }
  }

  neighbors -= grid[x][y].isLive;
  return neighbors;
}