import { createRoot } from "react-dom/client";
import { createElement } from "react";
import { Components_FifteenPuzzleGame } from "./Components.fs.js";

export const root = createRoot(document.getElementById("feliz-app"));

root.render(createElement(Components_FifteenPuzzleGame, null));

