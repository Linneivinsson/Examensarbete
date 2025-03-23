import React, { useEffect } from "react";
import { ShipTestView } from "../views/ShipTestView.jsx";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";

function ShipTestPresenter({ model }) {
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Genererar par för test:", model.testNumber);
    model.generatePairs();
    console.log("Model pairs efter generatePairs:", model.pairs);
  }, [model.testNumber]);

  const onComplete = async (duration) => {
    const durationInSeconds = duration.toFixed(2);
  
    const correctSelections = model.correctSelections;
    const incorrectSelections = model.incorrectSelections;
  
    await model.saveTestData(durationInSeconds, model.testNumber, correctSelections, incorrectSelections);
  
    if (model.testNumber < 4) {
      model.startNextTest();
      navigate(`/test/${model.testNumber}`);
    } else {
      navigate("/control-questions");
    }
  
  };

  return (
    <ShipTestView testNumber={model.testNumber} onComplete={onComplete} model={model} />
  );
}

ShipTestPresenter = observer(ShipTestPresenter);
export { ShipTestPresenter };
