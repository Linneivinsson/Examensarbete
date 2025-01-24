import React from "react";
import { createHashRouter, RouterProvider } from "react-router-dom";
import { StartPresenter } from "./presenters/StartPresenter.jsx";
import { UserDataFormPresenter } from "./presenters/UserDataFormPresenter.jsx";
import { ShipTestPresenter } from "./presenters/ShipTestPresenter.jsx";
import { ResultsPresenter } from "./presenters/ResultsPresenter.jsx";

function makeRouter(model) {
  return createHashRouter([
    { path: "/", element: <StartPresenter /> }, // Startsida
    { path: "/login", element: <UserDataFormPresenter model={model} /> }, // Inloggningssida
    { path: "/test/:testNumber", element: <ShipTestPresenter model={model} /> },
    { path: "/results", element: <ResultsPresenter model={model} /> },
  ]);
}

function ReactRoot({ model }) {
  return <RouterProvider router={makeRouter(model)} />;
}

export { ReactRoot, makeRouter };


