import cloneDeep from 'lodash/cloneDeep';
import uniq from 'lodash/uniq';
import cellTemplates from './template';
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

      // ignore edges for avoiding overflow
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

const isCellAvailable = (grid, col, row, colIndex, rowIndex) => {
  const neighborColIndex = col + colIndex;
  const neighborRowIndex = row + rowIndex;
  if (neighborColIndex > 0 && neighborColIndex < cols && neighborRowIndex > 0 && neighborRowIndex < rows && !grid[neighborColIndex][neighborRowIndex].isLive) {
    return true;
  }
  return false;
}

export const addTemplate = (grid, { template, color }) => {
  const availableCellIndexes = [];
  const cellTemplate = cellTemplates.find(ct => ct.name === template);
  if (cellTemplate) {

    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {

        if (i == 0 || i == cols - 1 || j == 0 || j == rows - 1) {
          continue;
        } else {
          const neighborsToCheck = [];
          const checkedNeighbors = cellTemplate.indexOfCell.map(cell => {
            const { colIndex, rowIndex } = cell;
            if (isCellAvailable(grid, i, j, colIndex, rowIndex)) {
              neighborsToCheck.push(cell);
            };
            return isCellAvailable(grid, i, j, colIndex, rowIndex);
          })
          if (checkedNeighbors.includes(false)) {
            continue;
          } else {
            availableCellIndexes.push({ i, j });
            break;
          }
        }
      }
    }

  }
  if (availableCellIndexes.length > 0) {
    const randomCell = availableCellIndexes[Math.floor(Math.random() * availableCellIndexes.length)];
    const { i, j } = randomCell;
    cellTemplate.indexOfCell.forEach(({ colIndex, rowIndex }) => {
      const neighborColIndex = i + colIndex;
      const neighborRowIndex = j + rowIndex;
      grid[neighborColIndex][neighborRowIndex].isLive = true;
      grid[neighborColIndex][neighborRowIndex].color = color;
    })
  }
  return grid;
}