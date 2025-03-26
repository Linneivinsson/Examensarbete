import React, { useEffect } from "react";
import "../style.css";

function ControlQuestionsView({ formData, onChange, onSubmit }) {
  useEffect(() => {
    const inputs = document.querySelectorAll(".user-input");
    inputs.forEach((input) => {
      const checkFilled = () => {
        if (input.value.trim() !== "") {
          input.classList.add("filled");
        } else {
          input.classList.remove("filled");
        }
      };

      input.addEventListener("input", checkFilled);
      checkFilled(); // kör direkt vid mount

      return () => {
        input.removeEventListener("input", checkFilled);
      };
    });
  }, []);

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Kontrollfrågor</h2>
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlFor="usedHeadphones">Använde du hörlurar vid testerna?</label>
            <select
              id="usedHeadphones"
              name="usedHeadphones"
              value={formData.usedHeadphones}
              onChange={onChange}
              className="user-input"
            >
              <option value="">Välj</option>
              <option value="Ja">Ja</option>
              <option value="Ja med noise canceling">Ja med noise canceling</option>
              <option value="Nej">Nej</option>
            </select>
          </div>


          <div className="form-group">
            <label htmlFor="infoEnvironment">Beskriv i vilken miljö du gjorde testerna:</label>
            <input
              id="infoEnvironment"
              name="infoEnvironment"
              type="text"
              value={formData.infoEnvironment}
              onChange={onChange}
              className="user-input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="unplannedDistractions">Hände något oväntat under testets gång som kan ha påverkat resultatet?</label>
            <input
              id="unplannedDistractions"
              name="unplannedDistractions"
              type="text"
              value={formData.unplannedDistractions}
              onChange={onChange}
              className="user-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="testDistractions">Hur mycket distraktion fanns runt omkring? (1=lågt, 5=högt)</label>
            <select
              id="testDistractions"
              name="testDistractions"
              value={formData.testDistractions}
              onChange={onChange}
              className="user-input"
            >
              <option value="">Välj 1 till 5</option>
              {[1, 2, 3, 4, 5].map((val) => (
                <option key={val} value={val}>
                  {val}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="clearVolume">Kunde du höra ljuden tydligt?</label>
            <select
              id="clearVolume"
              name="clearVolume"
              value={formData.clearVolume}
              onChange={onChange}
              className="user-input"
            >
              <option value="">Välj</option>
              <option value="Ja">Ja</option>
              <option value="Nej">Nej</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="volumeChange">Ändrade du volymen någon gång under testet, om ja, under vilket test?</label>
            <input
              id="volumeChange"
              name="volumeChange"
              type="text"
              value={formData.volumeChange}
              onChange={onChange}
              className="user-input"
            />
          </div>

          <button type="submit" className="login-button">
            Gå till resultat
          </button>
        </form>
      </div>
    </div>
  );
}

export { ControlQuestionsView };

