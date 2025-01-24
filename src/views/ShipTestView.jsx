import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";

const ShipTestView = observer(({ testNumber, onComplete, model }) => {
  const [pairs, setPairs] = useState([]);
  const [startTime, setStartTime] = useState(null);
  const [completed, setCompleted] = useState(false);
  const [duration, setDuration] = useState(0);
  const [helpMessage, setHelpMessage] = useState("");
  const [showHelp, setShowHelp] = useState(false);
  const [canProceed, setCanProceed] = useState(false);

  const playSound = () => {
    if (testNumber < 1 || testNumber > 4) {
      console.error(`Ogiltigt testnummer: ${testNumber}`);
      return () => {};
    }

    const soundPath = `/noise/noise${testNumber}.mp3`;
    console.log("Försöker spela ljud:", soundPath);

    const audio = new Audio(soundPath);
    audio.loop = true;

    audio.play()
      .then(() => console.log("Ljud spelas"))
      .catch((error) => console.error("Fel vid uppspelning av ljud:", error));

    return () => audio.pause();
  };

  useEffect(() => {
    const stopSound = playSound();

    if (model.pairs.length === 0) {
      console.error("Inga par är genererade i modellen.");
    } else {
      console.log("Model pairs i ShipTestView:", model.pairs);
      setPairs(model.pairs); // Använd paren från modellen
    }

    setStartTime(Date.now());
    setCompleted(false);
    setShowHelp(false);

    return stopSound; // Stoppa ljudet när komponenten avmonteras
  }, [testNumber, model.pairs]); // Lägg till model.pairs som beroende

  const handleSelection = (index) => {
    const newPairs = pairs.slice();
    newPairs[index].selected = !newPairs[index].selected;
    setPairs(newPairs);

    const wronglyMarked = newPairs.some(
      (pair) => !pair.isIdentical && pair.selected
    );
    const unmarkedIdentical = newPairs.some(
      (pair) => pair.isIdentical && !pair.selected
    );

    if (!wronglyMarked && !unmarkedIdentical) {
      setCanProceed(true);
      const currentDuration = Date.now() - startTime;
      setDuration(currentDuration); // Spara den avslutade tiden
      setCompleted(true); // Markera testet som klart
    } else {
      setCanProceed(false); // Användaren kan inte gå vidare
    }
  };

  return (
    <div>
      {!completed && (
        <>
          <div id="testContainer">
            {pairs.map((pair, index) => (
              <div
                key={index}
                onClick={() => handleSelection(index)}
                className={`pair ${pair.selected ? "selected" : ""}`}
              >
                <img
                  src={`/images/${pair.left}.svg`}
                  alt="Left Ship"
                  onError={() =>
                    console.error(`Kunde inte ladda: /images/${pair.left}.svg`)
                  }
                />
                <img
                  src={`/images/${pair.right}.svg`}
                  alt="Right Ship"
                  onError={() =>
                    console.error(`Kunde inte ladda: /images/${pair.right}.svg`)
                  }
                />
              </div>
            ))}
          </div>
        </>
      )}
      {completed && canProceed && (
        <div className="modal-overlay">
          <div className="modal-content">
            {testNumber < 4 ? ( // Om det inte är sista testet
              <>
                <h2>Nu vidare till nästa test</h2>
                <button className="login-button" onClick={() => onComplete(duration)}>
                  Nästa
                </button>
              </>
            ) : ( // Om det är sista testet
              <>
                <h2>Testen är klara</h2>
                <button className="login-button" onClick={() => onComplete(duration)}>
                  Gå till resultat
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
});

export { ShipTestView };
