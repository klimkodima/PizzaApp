import { StrictMode } from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { reducer, StateProvider } from "./state";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <StateProvider reducer={reducer}>
      <App/>
    </StateProvider>
  </StrictMode>,
  rootElement
);
