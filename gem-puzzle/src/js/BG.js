
import { randomInteger } from './utils';

export default class BG {
  constructor(src, gridSize) {
    // eslint-disable-next-line no-unused-expressions
    src ? (this.src = src) : (this.src = `./images/${randomInteger(1, 150)}.jpg`);
    this.img = new Image();
    this.img.src = this.src;
    this.gridSize = gridSize;

    switch (this.gridSize) {
      case 3:
        this.img.width = this.gridSize * 105;
        this.img.height = this.gridSize * 105;
        this.size = 105;
        break;

      case 4:
        this.img.width = this.gridSize * 85;
        this.img.height = this.gridSize * 85;
        this.size = 85;

        break;

      case 5:
        this.img.width = this.gridSize * 65;
        this.img.height = this.gridSize * 65;
        this.size = 65;

        break;

      case 6:
        this.img.width = this.gridSize * 55;
        this.img.height = this.gridSize * 55;
        this.size = 55;

        break;

      case 7:
        this.img.width = this.gridSize * 45;
        this.img.height = this.gridSize * 45;
        this.size = 45;

        break;

      case 8:
        this.img.width = this.gridSize * 45;
        this.img.height = this.gridSize * 45;
        this.size = 45;
        break;

      default:
        break;
    }
  }
}
