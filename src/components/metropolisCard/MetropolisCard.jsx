import "./MetropolisCard.css";
import { useState, useEffect } from "react";

export default function MetropolisCard({
  nomVille,
  consommation,
  production,
  echanges_physiques,
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isProductionVisible, setProductionVisible] = useState(true);
  // 2. Déclaration d'une variable d'état 'isExpanded'
  // et de sa fonction de mise à jour 'setIsExpanded'
  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  useEffect(() => {
    if (production === "ND") {
      setProductionVisible(false);
    }
  });
  // Creation du composant "MetropolisCard"
  // MetropolisCard est responsable de l’affichage des données d'une métropole
  return (
    <div className="panel">
      <h2 onClick={handleToggle}>{nomVille}</h2>
      <div className="card-content" hidden={!isExpanded}>
        <p>
          <span className="label">Consommation :</span>
          <span className="value">{consommation} MW</span>
        </p>

        <p hidden={!isProductionVisible}>
          <span className="label">Production :</span>
          <span className="value">{production} MW</span>
        </p>

        <p>
          <span className="label">Echangisme :</span>
          <span className="value">{echanges_physiques} MW</span>
        </p>
      </div>
    </div>
  );
}
