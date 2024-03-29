/* 
https://react.dev/learn/tutorial-tic-tac-toe
Note
You can also follow this tutorial using your local development environment. To do this, you need to:

Install Node.js
In the CodeSandbox tab you opened earlier, press the top-left corner button to open the menu, and then choose File > Export to ZIP in that menu to download an archive of the files locally
Unzip the archive, then open a terminal and cd to the directory you unzipped
Install the dependencies with npm install
Run npm start to start a local server and follow the prompts to view the code running in a browser
If you get stuck, don’t let this stop you! Follow along online instead and try a local setup again later. */

/* The first line defines a function called Square. 
The export JavaScript keyword makes this function accessible outside of this file. 
The default keyword tells other files using your code that it’s the main function 
in your file. 
To “escape into JavaScript” from JSX, you need curly braces. Add curly braces around value in JSX

*/

/*Each Square has its own state: the value stored in each Square is completely independent of 
the others. When you call a set function in a component, React automatically updates the 
child components inside too. */

import { useState } from 'react';

function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

function Board({ xIsNext, squares, onPlay }) {
// Array(9).fill(null) creates an array with nine elements and sets each of them to null
// The useState() call around it declares a squares state variable that’s initially set to that array. Each entry in the array corresponds to the value of a square. 
/*When you fill the board in later, the squares array will look like this:
       ['O', null, 'X', 'X', 'X', 'O', 'O', null, null]
 */


/*Note
JavaScript supports closures which means an inner function (e.g. handleClick) has access
 to variables and functions defined in a outer function (e.g. Board). The handleClick 
 function can read the squares state and call the setSquares method because they are
 both defined inside of the Board function. */

 /*You could try to set the onSquareClick prop of square to be handleClick(0) directly 
 in the JSX like this, but it won’t work:

<Square value={squares[0]} onSquareClick={handleClick(0)} /> */

//  const [squares, setSquares] = useState(Array(9).fill(null));
  
  function handleClick(i) {
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = 'X';
    } else {
      nextSquares[i] = 'O';
    }
    onPlay(nextSquares);
  }

/*The DOM <button> element’s onClick attribute has a special meaning to React because it 
is a built-in component. For custom components like Square, the naming is up to you. 
You could give any name to the Square’s onSquareClick prop or Board’s handleClick function,
 and the code would work the same. In React, it’s conventional to use onSomething names 
 for props which represent events and handleSomething for the function definitions which 
 handle those events. */

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = 'Winner: ' + winner;
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
  }

  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
}

/* removing the export default keywords before the function Board() 
{ declaration and adding them before the function Game() 
  { declaration. This tells your index.js file to use the Game component 
    as the top-level component 
  */

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = 'Go to move #' + move;
    } else {
      description = 'Go to game start';
    }

    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );

  });

/*In the Game function, you can add the key as 
<li key={move}>, 
and if you reload the rendered game, React’s “key” error should disappear: */


  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

/*Note
It does not matter whether you define calculateWinner before or after the Board.
Let’s put it at the end so that you don’t have to scroll past it every time you edit 
your components. */

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

/*If you have extra time or want to practice your new React skills, here are some ideas for improvements that you could make to the tic-tac-toe game, listed in order of increasing difficulty:

1 For the current move only, show “You are at move #…” instead of a button.
2 Rewrite Board to use two loops to make the squares instead of hardcoding them.
3 Add a toggle button that lets you sort the moves in either ascending or descending order.
4 When someone wins, highlight the three squares that caused the win (and when no one wins, display a message about the result being a draw).
5 Display the location for each move in the format (row, col) in the move history list. */