import "./InfoPanel.css";
import { useState } from "react";

export default function InfoPanel({ totalCities, avgConsumption, period }) {
  const [count, setCount] = useState(10);
  const increment = () => setCount(count + 10);
  const decrement = () => setCount(count - 1);
  const reset = () => setCount(0);
  const buttonStyle =
    count > 10 ? { backgroundColor: "red" } : { backgroundColor: "green" };

  return (
    <section id="info-panel" className="panel">
      <h3>Indicateurs clés</h3>
      <div id="indicators">
        <div id="indicator-total">
          <span>Nombre total de métropoles</span>
          <span>{totalCities}</span>
        </div>
        <div id="indicator-average">
          <span>Consommation Moyenne</span>
          <span>{avgConsumption}MW</span>
        </div>
        <div id="indicator-period">
          <span>Période d’observation</span>
          <span>{period}h</span>
        </div>
        Augmenter les taxes de :
        <button onClick={increment} className="btn-plus">
          +
        </button>
        <button onClick={decrement} className="btn-moins">
          -
        </button>
        <button onClick={reset} className="btn-reset" style={buttonStyle}>
          Révolution
        </button>
        {count}%
      </div>
    </section>
  );
}
