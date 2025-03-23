import React from "react";
import "../style.css";

function ResultsView({ userData, timeTaken }) {
  return (
    <div className="results-container">
      <h1 className="results-title">Testresultat</h1>
      <p className="thanks-text">Tack för din medverkan, {userData.fullName}!</p>
      <p className="results-subtitle">Dina testresultat:</p>

      <table className="results-table">
        <thead>
          <tr>
            <th>Testnummer</th>
            <th>Tid (sekunder)</th>
          </tr>
        </thead>
        <tbody>
          {timeTaken.map((time, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{time}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export { ResultsView };

