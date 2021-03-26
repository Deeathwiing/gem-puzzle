/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */

import lodash from 'lodash';
import State from './State';
import Box from './Box';
import NPuzzleSolver from './NPuzzleSolver';


import { isSolved, swapBoxes } from './utils';


export default class Game {
  constructor(state) {
    this.state = state;
    this.tickId = null;
    this.tick = this.tick.bind(this);
    this.render();
    this.handleClickBox = this.handleClickBox.bind(this);
  }

  static ready() {
    return new Game(State.ready());
  }

  tick() {
    this.setState({ time: this.state.time + 1 });
  }

  setState(newState) {
    this.state = Object.assign(this.state, newState);

    this.render();
  }


  static compare(a, b) {
    if (a.move > b.move) {
      return 1;
    }
    if (a.move < b.move) {
      return -1;
    }

    return -1;
  }

  static saveResult(time, move, size) {
    const result = {
      time,
      move,
      size,

    };

    const savedBestResults = JSON.parse(localStorage.getItem('best'));

    const bestResults = savedBestResults || {};

    const strSize = `size${result.size}`;

    if (!bestResults[strSize]) {
      bestResults[strSize] = [];
    }

    let temp = [...bestResults[strSize]];

    temp.push(result);
    temp.sort(Game.compare);
    temp = lodash.uniqBy(temp, 'move');

    temp = temp.slice(0, 10);

    bestResults[strSize] = temp;

    localStorage.setItem('best', JSON.stringify(bestResults));
  }

  static getBestResults() {
    const bestResults = JSON.parse(localStorage.getItem('best'));
    const results = document.createElement('div');
    results.className = 'results';

    const size3 = document.createElement('div');
    const size4 = document.createElement('div');
    const size5 = document.createElement('div');
    const size6 = document.createElement('div');
    const size7 = document.createElement('div');
    const size8 = document.createElement('div');

    for (let i = 1; i < 9; i += 1) {
      const span = document.createElement('span');
      span.textContent = `${i}x${i}`;
      span.style.color = 'white';

      switch (i) {
        case 3:

          size3.appendChild(span);
          break;
        case 4:
          size4.appendChild(span);

          break;
        case 5:
          size5.appendChild(span);

          break;
        case 6:
          size6.appendChild(span);

          break;
        case 7:
          size7.appendChild(span);

          break;
        case 8:
          size8.appendChild(span);

          break;
        default:
          break;
      }
    }

    for (const i in bestResults) {
      const element = bestResults[i];

      element.forEach((result) => {
        const span = document.createElement('span');

        span.textContent = `Move: ${result.move} Time: ${result.time}`;
        span.style.border = 'solid 1px';
        span.style.margin = '1px';


        switch (result.size) {
          case 3:

            size3.appendChild(span);
            break;
          case 4:
            size4.appendChild(span);

            break;
          case 5:
            size5.appendChild(span);

            break;
          case 6:
            size6.appendChild(span);

            break;
          case 7:
            size7.appendChild(span);

            break;
          case 8:
            size8.appendChild(span);

            break;
          default:
            break;
        }
      });
    }

    results.appendChild(size3);
    results.appendChild(size4);
    results.appendChild(size5);
    results.appendChild(size6);
    results.appendChild(size7);
    results.appendChild(size8);

    return results;
  }

  handleClickBox(box) {
    return function () {
      const audio = document.querySelector('audio');
      audio.play();
      const nextdoorBoxes = box.getNextdoorBoxes();
      const blankBox = nextdoorBoxes.find(
        (nextdoorBox) => this.state.grid[nextdoorBox.y][nextdoorBox.x] === 0,
      );
      if (blankBox) {
        const newGrid = [...this.state.grid];
        swapBoxes(newGrid, box, blankBox);
        if (isSolved(newGrid)) {
          const time = `${Math.floor(+JSON.parse(localStorage.getItem('time')) / 60)}m:${+JSON.parse(localStorage.getItem('time')) % 60}s`;
          const move = +JSON.parse(localStorage.getItem('move')) + 1;

          Game.saveResult(time, move, newGrid.length);

          clearInterval(this.tickId);
          alert(`Ура! Вы решили головоломку за ${time} и ${move} ходов`);
          this.setState({
            status: 'won',
            grid: newGrid,
            move: this.state.move + 1,
          });
        } else {
          this.setState({
            grid: newGrid,
            move: this.state.move + 1,
          });
        }
      }
    }.bind(this);
  }

  autoComplete() {
    this.setState({ status: 'auto' });
    let gridCopy = JSON.stringify(this.state.grid);
    gridCopy = gridCopy.replace(/,0/g, ',""');
    gridCopy = gridCopy.replace(/\[0/g, '[""');
    gridCopy = JSON.parse(gridCopy);
    const solver = new NPuzzleSolver(gridCopy);
    const solution = solver.solve();
    const speed = document.getElementById('speed').value;

    solution.forEach((element, i) => {
      setTimeout(() => {
        this.handleClickBox(new Box(element.piece.x, element.piece.y))(this);
      }, speed * i);
      this.render();
    });
  }


  render() {
    const {
      grid, move, time, status, bg,
    } = this.state;


    localStorage.setItem('grid', JSON.stringify(grid));
    localStorage.setItem('bg', JSON.stringify(bg.src));


    if (status === 'playing' || status === 'auto') {
      localStorage.setItem('move', JSON.stringify(move));
      localStorage.setItem('time', JSON.stringify(time));
    }


    const newTime = `${Math.floor(+JSON.parse(localStorage.getItem('time')) / 60)}m:${+JSON.parse(localStorage.getItem('time')) % 60}s`;
    const newMove = `${+JSON.parse(localStorage.getItem('move'))}`;

    const newGrid = document.createElement('div');
    newGrid.className = `grid__${grid.length}`;


    for (let i = 0; i < grid.length; i += 1) {
      for (let j = 0; j < grid.length; j += 1) {
        const button = document.createElement('button');


        if (status === 'playing') {
          button.addEventListener('click', this.handleClickBox(new Box(j, i)));
        }


        button.style.background = `url(${bg.img.src})`;
        button.style.backgroundSize = `${bg.img.width}px ${bg.img.height}px`;
        const index = +grid[i][j];
        const left = bg.size * ((index - 1) % (bg.gridSize));
        const top = bg.size * (Math.floor((index - 1) / (bg.gridSize)));


        if (index === 0) {
          button.style.background = 'none';
        } else {
          button.style.backgroundPositionX = `-${left}px`;
          button.style.backgroundPositionY = `-${top}px`;
        }

        button.textContent = grid[i][j] === 0 ? '' : grid[i][j].toString();
        button.id = grid[i][j] === 0 ? '' : grid[i][j].toString();
        newGrid.appendChild(button);
      }
    }

    const gridDOM = document.querySelector('.game div');
    const result = document.querySelector('.results');

    gridDOM.replaceWith(newGrid);
    result.replaceWith(Game.getBestResults());

    const newButtonPlay = document.createElement('button');

    if (status === 'ready') newButtonPlay.textContent = 'Play';
    if (status === 'playing') newButtonPlay.textContent = 'Reset';
    if (status === 'won') newButtonPlay.textContent = 'Play';
    if (status === 'auto') newButtonPlay.textContent = 'Wait';


    newButtonPlay.className = 'play__button';

    newButtonPlay.addEventListener('click', (e) => {
      clearInterval(this.tickId);
      this.tickId = setInterval(this.tick, 1000);
      this.setState(State.start(status, e));
    });


    document.querySelector('.play__button').replaceWith(newButtonPlay);

    const newButtonAuto = document.createElement('button');

    if (status === 'auto') newButtonAuto.textContent = 'Wait';
    if (status !== 'auto') newButtonAuto.textContent = 'Auto';


    newButtonAuto.className = 'autocomplete__button';

    newButtonAuto.addEventListener('click', this.autoComplete.bind(this));

    document.querySelector('.autocomplete__button').replaceWith(newButtonAuto);

    const select = document.getElementById('field');
    select.value = grid.length - 1;
    select.onchange = () => {
      this.setState(State.start(status, {
        target: {
          textContent: 'Reset',
        },
      }));
    };

    document.getElementById('move').textContent = `Move: ${newMove}`;

    document.getElementById('time').textContent = `${newTime}`;
  }
}
