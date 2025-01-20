import React from "react";
import { ShipTestView } from "../views/ShipTestView.jsx";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";
import { saveTestResult } from "../firebaseModel.js";

function ShipTestPresenter({ model }) {
  const navigate = useNavigate();

  const saveResult = async (duration) => {
    const soundFile = `noise${model.testNumber}.mp3`; // Ljudfil baserat på testnumret
    const durationInSeconds = (duration / 1000).toFixed(2); // Konvertera till sekunder
    await saveTestResult(model.userData, model.testNumber, durationInSeconds, soundFile); // Spara till Firestore
    model.timeTaken.push(duration); // Spara lokalt resultat
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
    <ShipTestView
      testNumber={model.testNumber}
      onComplete={onComplete}
    />
  );
}

ShipTestPresenter = observer(ShipTestPresenter);
export { ShipTestPresenter };

