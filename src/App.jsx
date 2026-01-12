import "./App.css";
import { useState, useEffect } from "react";
import InfoPanel from "./components/infoPanel/InfoPanel";
import MetropolisCard from "./components/metropolisCard/MetropolisCard";
import data from "./dataLight.json";

function App() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // ✅ Extrait le tableau du JSON
    const arrayData = data.items || data || [];

    // ✅ Vérifie que c'est un tableau
    if (Array.isArray(arrayData)) {
      setItems(arrayData);
    } else {
      console.error("Données non valides:", arrayData);
      setItems([]);
    }

    setLoading(false);
  }, []);

  return (
    <>
      <header>
        <InfoPanel totalCities="200" avgConsumption="950" period="24" />
      </header>
      <header>
        {items.map((item) => (
          <MetropolisCard
            key={item.id}
            consommation={item.consommation}
            nomVille={item.nom}
          />
        ))}
      </header>
    </>
  );
}

export default App;
