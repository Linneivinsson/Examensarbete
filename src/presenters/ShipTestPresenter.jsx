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

  const saveResult = async (duration) => {
    const soundFile = model.getCurrentSound(); // Hämta aktuellt ljud
    const durationInSeconds = (duration / 1000).toFixed(2);
    await model.saveTestData(durationInSeconds);
  };

  const onComplete = async (duration) => {
    await saveResult(duration);

    if (model.testNumber < 4) {
      model.testNumber += 1; // Öka testnumret
      navigate(`/test/${model.testNumber}`); // Navigera till nästa testsida
    } else {
      navigate("/results"); // Navigera till resultatsidan
    }
  };

  return (
    <ShipTestView testNumber={model.testNumber} onComplete={onComplete} model={model} />
  );
}

ShipTestPresenter = observer(ShipTestPresenter);
export { ShipTestPresenter };

