import "./App.css";
import { useState, useEffect } from "react";
import InfoPanel from "./components/infoPanel/InfoPanel";
import MetropolisCard from "./components/metropolisCard/MetropolisCard";

function App() {
  // Lors du premier rendu du composant,
  // les données n'ont pas encore été récupées
  // (temps d'affichage du site < temps de récupération des données)
  // Nous stockons donc dans notre composant App un état responsable
  // de la récupération des données des métropoles
  const [metropolisesDatas, setMetropolisesDatas] = useState({});
  // Nous nous assurons que la récupération des données ne se fait
  // qu'au premier chargement du composant App
  // ajout des deux nouveaux états
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchDatas = async () => {
      try {
        // l'état isLoading passe à true au début du chargement des données
        setIsLoading(true);
        const response = await fetch(
          "/eco2mix-metropoles-2025-janvier-01.json"
        );
        // ‘/’ part du dossier public du projet
        const datas = await response.json();
        setMetropolisesDatas(datas);
      } catch (err) {
        // Si une erreur apparaît ; l'état error stocke le message d'erreur
        setError(err.message);
      } finally {
        // Dans tous les cas ; l'état isLoading repasse à la fin à faux
        setIsLoading(false);
      }
    };

    // attention : il faut utiliser le "setter" 'setMetropolisesDatas' fournit par useState
    // à ne pas faire : `metropolisesDatas = datas` car on sort complètement de
    // la logique de useState et du cycle de vie des composants dans React
    fetchDatas();
  }, []); // [] => rappel : contenu du useEffect exécuté uniquement
  // au premier rendu du composant App

  return (
    <>
      <header>
        <InfoPanel totalCities="200" avgConsumption="950" period="24" />
      </header>
      {Object.keys(metropolisesDatas).length !== 0 && (
        <header>
          <ul>
            {Object.keys(metropolisesDatas).map((cityKey) => (
              <li>
                <MetropolisCard
                  key={cityKey}
                  nomVille={cityKey}
                  consommation={
                    metropolisesDatas[cityKey].datas["2025-01-01"]["12:00"]
                      .consommation
                  }
                  production={
                    metropolisesDatas[cityKey].datas["2025-01-01"]["12:00"]
                      .production
                  }
                  echanges_physiques={
                    metropolisesDatas[cityKey].datas["2025-01-01"]["12:00"]
                      .echanges_physiques
                  }
                />
              </li>
            ))}
          </ul>
        </header>
      )}
      {/* Ajout de l’affichage du message de chargement */}
      {isLoading === true && (
        <p>Données en cours de chargement... veuillez patienter</p>
      )}
      {/* Ajout de l’affichage du message d’erreur si il y en a eu une */}
      {error !== null && <p>{error}</p>}
    </>
  );
}

export default App;

// <MetropolisCard
//   key={ecoItem.key}
//   consommation={ecoItem.consommation}
//   nomVille={ecoItem.nom}
// />

{
  /* <MetropolisCard
            nomVille={Object.keys(metropolisesDatas)[0]}
            consommation={
              metropolisesDatas[Object.keys(metropolisesDatas)[0]].datas[
                "2025-01-01"
              ]["12:00"].consommation
            }
          />
          <MetropolisCard
            nomVille={Object.keys(metropolisesDatas)[1]}
            consommation={
              metropolisesDatas[Object.keys(metropolisesDatas)[1]].datas[
                "2025-01-01"
              ]["12:00"].consommation
            }
          />
          <MetropolisCard
            nomVille={Object.keys(metropolisesDatas)[2]}
            consommation={
              metropolisesDatas[Object.keys(metropolisesDatas)[2]].datas[
                "2025-01-01"
              ]["12:00"].consommation
            }
          /> */
}
