import Game from './Game';
import '../css/style.css';

document.body.innerHTML = `
    <div class='results'></div>
<div class="game">\n
    <div class="grid__4">\n
        <button>1</button>\n
        <button>2</button>\n
        <button>3</button>\n
        <button>4</button>\n
        <button>5</button>\n
        <button>6</button>\n
        <button>7</button>\n
        <button>8</button>\n
        <button>9</button>\n
        <button>10</button>\n
        <button>11</button>\n
        <button>12</button>\n
        <button>13</button>\n
        <button>14</button> \n
        <button>15</button>\n
        <button></button>\n
    </div>\n
<div class="footer">\n
    <button class='play__button'>Play</button>\n
    <button class='autocomplete__button'>Auto</button>\n
    <select id="field">
        <option value="2">3x3</option>
        <option value="3" selected>4x4</option>
        <option value="4">5x5</option>
        <option value="5">6x6</option>
        <option value="6">7x7</option>
        <option value="7">8x8</option>

    </select>
     <select id="speed">
        <option value="50" selected>50ms</option>
        <option value="200" >200ms</option>
        <option value="500">500ms</option>
        <option value="800">800ms</option>
        <option value="1000">1s</option>
    </select>
    <span id="move">Move: 100</span>\n
    <span id="time">Time: 100</span>\n
    </div>\n
    <audio src="./sounds/delete.wav"></audio>
</div>`;


Game.ready();
