import "./App.css";
import { useState, useEffect } from "react";
import InfoPanel from "./components/infoPanel/InfoPanel";
import MetropolisCards from "./components/metropolisCard/MetropolisCards";

function App() {
  return (
    <>
      <header>
        <InfoPanel totalCities="200" avgConsumption="950" period="24" />
      </header>
      <header>
        <MetropolisCards />
      </header>
    </>
  );
}

export default App;
