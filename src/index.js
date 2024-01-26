import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

import App from "./App";

//is the bridge between the component you created in the App.js file and the web browser.
/* https://react.dev/learn/tutorial-tic-tac-toe#setup-for-the-tutorial
brings all the necessary pieces together:
React
React’s library to talk to web browsers (React DOM)
the styles for your components
the component you created in App.js.
*/
const root = createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);