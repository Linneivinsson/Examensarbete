import React, { useEffect, useState, useRef } from "react";
import { observer } from "mobx-react-lite";

const ShipTestView = observer(({ testNumber, onComplete, model }) => {
  const [pairs, setPairs] = useState([]);
  const [startTime, setStartTime] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef(null); // 🟢 Ref för att hålla ljudobjektet

  const playSound = () => {
    const currentSound = model.getCurrentSound();
    if (!currentSound) {
      console.error("Inget giltigt ljud att spela");
      return;
    }
  
    const soundPath = `/noise/${currentSound}`;
    console.log("Försöker spela ljud:", soundPath);
  
    if (audioRef.current) {
      audioRef.current.pause();
    }
  
    const audio = new Audio(soundPath);
    audio.loop = true;
    audioRef.current = audio;
  
    audio.play()
      .then(() => console.log("Ljud spelas"))
      .catch((error) => console.error("Fel vid uppspelning av ljud:", error));
  };
  

  useEffect(() => {
    playSound(); // Spela ljudet för detta test
  
    if (model.pairs.length === 0) {
      console.error("Inga par är genererade i modellen.");
    } else {
      console.log("Model pairs i ShipTestView:", model.pairs);
      setPairs(model.pairs);
    }
  
    setStartTime(Date.now());
  
    return () => {
      // Stoppa ljudet när komponenten avmonteras eller testet ändras
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [testNumber, model.pairs]);
  

  const handleSelection = (index) => {
    model.selectPair(index);
    setPairs([...model.pairs]);
  };

  const handleComplete = () => {
    const currentDuration = (Date.now() - startTime) / 1000;
    setDuration(currentDuration);
    model.completeTest(currentDuration);
    if (audioRef.current) audioRef.current.pause(); // 🟢 Stoppar ljudet
    setShowModal(true);
  };

  const handleNextTest = () => {
    setShowModal(false);
    onComplete(duration);
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
          Klart
          </button>
        </div>
      )}

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            {testNumber < 4 ? (
              <>
                <h2>Nu vidare till nästa test</h2>
                <button className="next-button" onClick={handleNextTest}>
                  Nästa
                </button>
              </>
            ) : (
              <>
                <h2>Testen är klara</h2>
                <button className="next-button" onClick={handleNextTest}>
                  Gå till kontrollfrågor
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
