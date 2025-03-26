import React, { useEffect } from "react";
import "../style.css";

function UserDataFormView({ formData, onChange, onSubmit }) {
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
      checkFilled(); // Kör direkt

      return () => {
        input.removeEventListener("input", checkFilled);
      };
    });
  }, []);

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Fyll i dina uppgifter</h2>
        <form onSubmit={onSubmit}>
          {/* Fullständigt namn */}
          <div className="form-group">
            <label htmlFor="fullName">Fullständigt namn:</label>
            <input
              id="fullName"
              name="fullName"
              type="text"
              value={formData.fullName}
              onChange={onChange}
              className="user-input"
            />
          </div>

          {/* Kön */}
          <div className="form-group">
            <label htmlFor="gender">Kön:</label>
            <select
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={onChange}
              className="user-input"
            >
              <option value="">Välj kön</option>
              <option value="Kvinna">Kvinna</option>
              <option value="Man">Man</option>
              <option value="Övrigt">Övrigt</option>
            </select>
          </div>

          {/* Ålder */}
          <div className="form-group">
            <label htmlFor="age">Ålder:</label>
            <input
              id="age"
              name="age"
              type="number"
              value={formData.age}
              onChange={onChange}
              className="user-input"
            />
          </div>

          {/* År på KTH */}
          <div className="form-group">
            <label htmlFor="year">Läsår på KTH:</label>
            <select
              id="year"
              name="year"
              value={formData.year}
              onChange={onChange}
              className="user-input"
            >
              <option value="">Välj år</option>
              {[1, 2, 3, 4, 5].map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>

          {/* Program */}
          <div className="form-group">
            <label htmlFor="program">Program på KTH:</label>
            <input
              id="program"
              name="program"
              type="text"
              value={formData.program}
              onChange={onChange}
              className="user-input"
            />
          </div>

          {/* E-postadress */}
          <div className="form-group">
            <label htmlFor="email">E-postadress:</label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={onChange}
              className="user-input"
            />
          </div>

          <button type="submit" className="login-button">
            Vidare till testet
          </button>
        </form>
      </div>
    </div>
  );
}

export { UserDataFormView };
