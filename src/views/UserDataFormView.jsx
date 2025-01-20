import React from "react";
import "../style.css"; // Importera CSS-filen

function UserDataFormView({ formData, onChange, onSubmit }) {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Enter Your Details</h2>
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label>Full Name:</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={onChange}
              className="user-input"
            />
          </div>
          <div className="form-group">
            <label>Gender:</label>
            <input
              type="text"
              name="gender"
              value={formData.gender}
              onChange={onChange}
              className="user-input"
            />
          </div>
          <div className="form-group">
            <label>Age:</label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={onChange}
              className="user-input"
            />
          </div>
          <div className="form-group">
            <label>Year at KTH:</label>
            <input
              type="text"
              name="year"
              value={formData.year}
              onChange={onChange}
              className="user-input"
            />
          </div>
          <div className="form-group">
            <label>Program at KTH:</label>
            <input
              type="text"
              name="program"
              value={formData.program}
              onChange={onChange}
              className="user-input"
            />
          </div>
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={onChange}
              className="user-input"
            />
          </div>
          <div className="button-group">
            <button type="submit" className="login-button">
              Vidare till testet
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export { UserDataFormView };
