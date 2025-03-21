// ControlQuestionsView.jsx
import React from "react";

function ControlQuestionsView({ formData, onChange, onSubmit }) {
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
              onChange={onChange} // Direkt koppling till onChange
              className="user-input"
            >
              <option value="">Välj</option>
              <option value="Ja">Ja</option>
              <option value="Ja med noise canceling">Ja med noise canceling</option>
              <option value="Nej">Nej</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="testEnvironment">I vilken miljö gjorde du testerna?</label>
            <input
              id="testEnvironment"
              name="testEnvironment"
              type="text"
              value={formData.testEnvironment}
              onChange={onChange} // Direkt koppling till onChange
              className="user-input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="infoEnvironment">Beskriv i vilken miljö gjorde du testerna?</label>
            <input
              id="infoEnvironment"
              name="infoEnvironment"
              type="text"
              value={formData.infoEnvironment}
              onChange={onChange} // Direkt koppling till onChange
              className="user-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="testDistractions">Hur mycket distraktion fanns runt omkring, 1 lågt, 5 högt</label>
            <select
              id="testDistractions"
              name="testDistractions"
              value={formData.testDistractions}
              onChange={onChange}
              className="user-input"
            >
              <option value="">Välj 1 till 5</option>
              {[1, 2, 3, 4, 5].map((testDistractions) => (
                <option key={testDistractions} value={testDistractions}>
                  {testDistractions}
                </option>
              ))}
            </select>
          </div>
          

          <div className="form-group">
            <label htmlFor="computerVolume">Vilken ljudnivå hade du på din dator under testerna?</label>
            <input
              id="computerVolume"
              name="computerVolume"
              type="text"
              value={formData.computerVolume}
              onChange={onChange} // Direkt koppling till onChange
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

