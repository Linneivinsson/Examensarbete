import React from "react";
import { createHashRouter, RouterProvider } from "react-router-dom";
import { UserDataFormPresenter } from "./presenters/UserDataFormPresenter.jsx";
import { ShipTestPresenter } from "./presenters/ShipTestPresenter.jsx";
import { ResultsPresenter } from "./presenters/ResultsPresenter.jsx";

function makeRouter(model) {
  return createHashRouter([
    { path: "/", element: <UserDataFormPresenter model={model} /> },
    { path: "/test/:testNumber", element: <ShipTestPresenter model={model} /> },
    { path: "/results", element: <ResultsPresenter model={model} /> },
  ]);
}

function ReactRoot({ model }) {
  return <RouterProvider router={makeRouter(model)} />;
}

export { ReactRoot, makeRouter };

