import "./MetropolisCard.css";
import { useState } from "react"; // 1. Import du Hook useState

export default function MetropolisCard({ nomVille, consommation }) {
  // 2. Déclaration d'une variable d'état 'isExpanded'
  // et de sa fonction de mise à jour 'setIsExpanded'
  const [isExpanded, setIsExpanded] = useState(false);

  // Creation du composant "MetropolisCard"
  // MetropolisCard est responsable de l’affichage des données d'une métropole
  return (
    <div className="panel">
      <h2>{nomVille}</h2>
      <div className="card-content">
        <p>
          <span className="label">Consommation :</span>
          <span className="value">{consommation} MW</span>
        </p>
      </div>
    </div>
  );
}
