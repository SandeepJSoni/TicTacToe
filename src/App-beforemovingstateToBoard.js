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

import {useState} from 'react';

function Square({}) {

  const [value , setValue] =  useState(null);

  function handleClick() {
    setValue('X');
  }

  return (<buton 
            className='square'
            onClick={handleClick}
            >
              {value}
          </buton>);
}

export default function Board() {
  return (
    <>
    <div className='board-row'>
      <Square />
      <Square />
      <Square />
    </div>
    <div className='board-row'>
      <Square />
      <Square />
      <Square />
    </div>
    <div className='board-row'>
      <Square />
      <Square />
      <Square />
    </div>
    </>
  ) ;
}

