import "./InfoPanel.css";

export default function InfoPanel() {
  return (
    <section id="info-panel">
      <h3>Indicateurs clés</h3>
      <div id="indicators">
        <div id="indicator-total">
          <span>Nombre total de métropoles</span>
          <span>15</span>
        </div>
        <div id="indicator-average">
          <span>Consommation Moyenne</span>
          <span>950MW</span>
        </div>
        <div id="indicator-period">
          <span>Période d’observation</span>
          <span>24h</span>
        </div>
      </div>
    </section>
  );
}
