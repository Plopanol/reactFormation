import "./MetropolisCard.css";
import { useState, useEffect } from "react";

export default function MetropolisCard({
  nomVille,
  consommation,
  production,
  echanges_physiques,
}) {
  const [isExpanded, setIsExpanded] = useState(false);

  // 2. Déclaration d'une variable d'état 'isExpanded'
  // et de sa fonction de mise à jour 'setIsExpanded'
  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  const isProductionMasquer = production === "ND";

  // Creation du composant "MetropolisCard"
  // MetropolisCard est responsable de l’affichage des données d'une métropole
  return (
    <div>
      <h2 onClick={handleToggle}>{nomVille}</h2>
      <div className="card-content" hidden={!isExpanded}>
        <ul>
          <li>
            <span className="label">Consommation : </span>
            <span className="value">{consommation} MW</span>
          </li>
          <li hidden={isProductionMasquer}>
            <span className="label">Production :</span>
            <span className="value">{production} MW</span>
          </li>
          <li>
            <span className="label">Echangisme :</span>
            <span className="value">{echanges_physiques} MW</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
