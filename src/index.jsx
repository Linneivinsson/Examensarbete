import React from "react"; // Lägg till denna rad för att importera React
import { createRoot } from "react-dom/client";
import { ReactRoot } from "./ReactRoot.jsx";
import { observable, configure } from "mobx";
import { model } from "./Model.js"; // Ditt modelobjekt

configure({ enforceActions: "never" });

const reactiveModel = observable(model);

createRoot(document.getElementById("root")).render(
  <ReactRoot model={reactiveModel} />
);
