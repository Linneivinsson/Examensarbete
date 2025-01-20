import React from "react";
import { ShipTestView } from "../views/ShipTestView.jsx";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";

function ShipTestPresenter({ model }) {
  const navigate = useNavigate();

  const saveResult = (duration) => {
    model.timeTaken.push(duration); // Spara resultatet för aktuellt test
  };

  const onComplete = (duration) => {
    saveResult(duration);

    if (model.testNumber < 4) {
      model.testNumber += 1; // Öka testnumret
      navigate(`/test/${model.testNumber}`); // Navigera till nästa testsida
    } else {
      navigate("/results"); // Navigera till resultatsidan
    }
  };

  return (
    <ShipTestView
      testNumber={model.testNumber}
      onComplete={onComplete}
    />
  );
}

ShipTestPresenter = observer(ShipTestPresenter);
export { ShipTestPresenter };



