import React from "react";
import { useNavigate } from "react-router-dom";
import { StartView } from "../views/StartView.jsx";

function StartPresenter() {
  const navigate = useNavigate();

  const handleNavigateToLogin = () => {
    navigate("/login"); // Navigera till inloggningssidan
  };

  return <StartView onNavigateToLogin={handleNavigateToLogin} />;
}

export { StartPresenter };
