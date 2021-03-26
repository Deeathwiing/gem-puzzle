import { getRandomGrid } from './utils';
import BG from './BG';


export default class State {
  constructor(grid, move, time, status, bg) {
    this.grid = grid;
    this.move = move;
    this.time = time;
    this.status = status;
    this.bg = bg;
  }

  static ready() {
    const grid = JSON.parse(localStorage.getItem('grid'));
    let bg;


    if (!grid) {
      bg = new BG(null, 4);

      return new State(
        [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]],
        0,
        0,
        'ready',
        bg,
      );
    }


    bg = new BG(JSON.parse(localStorage.getItem('bg')), grid.length);

    return new State(
      grid,
      0,
      0,
      'ready',
      bg,
    );
  }

  static start(status, e) {
    const src = JSON.parse(localStorage.getItem('bg'));


    if (e.target.textContent === 'Reset') {
      const grid = getRandomGrid();
      const bg = new BG(null, grid.length);

      return new State(grid, 0, 0, 'playing', bg);
    }

    if (status === 'won') {
      const grid = getRandomGrid();
      const bg = new BG(null, grid.length);

      return new State(grid, 0, 0, 'playing', bg);
    }

    let savedGrid = localStorage.getItem('grid');

    const initGrid = JSON.stringify([[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]]);


    if (savedGrid === initGrid || !savedGrid) {
      const grid = getRandomGrid();
      const bg = new BG(null, grid.length);
      return new State(grid, 0, 0, 'playing', bg);
    }

    savedGrid = JSON.parse(savedGrid);
    const bg = new BG(src, savedGrid.length);


    const time = JSON.parse(localStorage.getItem('time'));
    const move = JSON.parse(localStorage.getItem('move'));
    return new State(savedGrid, move, time, 'playing', bg);
  }
}
