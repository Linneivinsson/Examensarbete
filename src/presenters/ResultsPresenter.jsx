import React from "react";
import { ResultsView } from "../views/ResultsView.jsx";

function ResultsPresenter({ model }) {
  return <ResultsView userData={model.userData} timeTaken={model.timeTaken} />;
}

export { ResultsPresenter };

