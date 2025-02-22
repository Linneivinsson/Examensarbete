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

