import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";

const ShipTestView = observer(({ testNumber, onComplete, model }) => {
  const [pairs, setPairs] = useState([]);
  const [startTime, setStartTime] = useState(null);
  const [showModal, setShowModal] = useState(false); // Kontrollerar modalen
  const [duration, setDuration] = useState(0);

  const playSound = () => {
    const currentSound = model.getCurrentSound();
    if (currentSound === "noise0.mp3") return () => {}; // Inget ljud spelas för noise0

    const soundPath = `/noise/${currentSound}`;
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
      setPairs(model.pairs);
    }

    setStartTime(Date.now());

    return stopSound; // Stoppa ljudet när komponenten avmonteras
  }, [testNumber, model.pairs]);

  const handleSelection = (index) => {
    model.selectPair(index); // Uppdatera modellen
    setPairs([...model.pairs]); // Uppdatera state från modellen
};

  const handleComplete = () => {
    const currentDuration = (Date.now() - startTime) / 1000;
    setDuration(currentDuration); // Spara tiden
    model.completeTest(currentDuration);
    setShowModal(true); // Visa modalen efter att "Klar" klickas
  };

  const handleNextTest = () => {
    setShowModal(false); // Dölj modalen
    onComplete(duration); // Navigera vidare
  };

  return (
    <div>
      {!showModal && (
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
          <button className="finish-button" onClick={handleComplete}>
            Klar
          </button>
        </div>
      )}

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            {testNumber < 5 ? (
              <>
                <h2>Nu vidare till nästa test</h2>
                <button className="login-button" onClick={handleNextTest}>
                  Nästa
                </button>
              </>
            ) : (
              <>
                <h2>Testen är klara</h2>
                <button className="login-button" onClick={handleNextTest}>
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
