/* eslint-disable no-param-reassign */
import Box from './Box';
import NPuzzleSolver from './NPuzzleSolver';

const swapBoxes = (grid, box1, box2) => {
  const temp = grid[+box1.y][+box1.x];

  grid[+box1.y][+box1.x] = grid[+box2.y][+box2.x];
  grid[+box2.y][+box2.x] = temp;
};


const isSolved = (grid) => {
  const ourGrid = grid.toString();

  const strOur = ourGrid.substring(0, ourGrid.length - 2);

  const rightGrid = grid.flat(Infinity).sort((a, b) => a - b).toString();


  const strRight = rightGrid.slice(2);

  return strOur === strRight;
};

const getRandomGrid = () => {
  let grid;
  let blankBox;
  const size = document.getElementById('field').value;

  switch (+size + 1) {
    case 3:
      grid = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 0],

      ];
      blankBox = new Box(2, 2);
      break;

    case 4:
      grid = [
        [1, 2, 3, 4],
        [5, 6, 7, 8],
        [9, 10, 11, 12],
        [13, 14, 15, 0],
      ];
      blankBox = new Box(3, 3);
      break;

    case 5:

      grid = [
        [1, 2, 3, 4, 5],
        [6, 7, 8, 9, 10],
        [11, 12, 13, 14, 15],
        [16, 17, 18, 19, 20],
        [21, 22, 23, 24, 0],
      ];
      blankBox = new Box(4, 4);
      break;

    case 6:

      grid = [
        [1, 2, 3, 4, 5, 6],
        [7, 8, 9, 10, 11, 12],
        [13, 14, 15, 16, 17, 18],
        [19, 20, 21, 22, 23, 24],
        [25, 26, 27, 28, 29, 30],
        [31, 32, 33, 34, 35, 0],
      ];
      blankBox = new Box(5, 5);
      break;

    case 7:

      grid = [
        [1, 2, 3, 4, 5, 6, 7],
        [8, 9, 10, 11, 12, 13, 14],
        [15, 16, 17, 18, 19, 20, 21],
        [22, 23, 24, 25, 26, 27, 28],
        [29, 30, 31, 32, 33, 34, 35],
        [36, 37, 38, 39, 40, 41, 42],
        [43, 44, 45, 46, 47, 48, 0],
      ];
      blankBox = new Box(6, 6);
      break;

    case 8:

      grid = [
        [1, 2, 3, 4, 5, 6, 7, 8],
        [9, 10, 11, 12, 13, 14, 15, 16],
        [17, 18, 19, 20, 21, 22, 23, 24],
        [25, 26, 27, 28, 29, 30, 31, 32],
        [33, 34, 35, 36, 37, 38, 39, 40],
        [41, 42, 43, 44, 45, 46, 47, 48],
        [49, 50, 51, 52, 53, 54, 55, 56],
        [57, 58, 59, 60, 61, 62, 63, 0],
      ];
      blankBox = new Box(7, 7);
      break;

    default:
      break;
  }


  for (let i = 0; i < 1000; i += 1) {
    const randomNextdoorBox = blankBox.getRandomNextdoorBox();
    swapBoxes(grid, blankBox, randomNextdoorBox);
    blankBox = randomNextdoorBox;
  }
  let gridCopy = JSON.stringify(grid);
  gridCopy = gridCopy.replace(/,0/g, ',""');
  gridCopy = gridCopy.replace(/\[0/g, '[""');
  gridCopy = JSON.parse(gridCopy);
  const solver = new NPuzzleSolver(gridCopy);
  const isItHaveSolution = solver.solve();
  if (isSolved(grid) || !isItHaveSolution) return getRandomGrid();
  return grid;
};

const randomInteger = (min, max) => {
  const random = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(random);
};

export {
  swapBoxes, isSolved, getRandomGrid, randomInteger,
};
