import { useState, useEffect } from "react";
import MetropolisCard from "./MetropolisCard";

export default function MetropolisCards() {
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

  const [refresh, setRefresh] = useState(0);

  const [tri, setTri] = useState("defaut");

  const handleChangeTri = (event) => {
    console.log(event.target.value);
    setTri(event.target.value);
  };

  useEffect(() => {
    const fetchDatas = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          "/eco2mix-metropoles-2025-janvier-01.json"
        );
        const datas = await response.json();
        const sortedMetropolisesDatas = {};

        // Tri
        if ("nomVille" === tri) {
          const listNomsVilles = Object.keys(datas).sort();
          listNomsVilles.forEach((nomVille) => {
            sortedMetropolisesDatas[nomVille] = datas[nomVille];
          });
          setMetropolisesDatas(sortedMetropolisesDatas);
        } else {
          setMetropolisesDatas(datas);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDatas();
  }, [refresh, tri]);

  const handleRefresh = () => {
    setMetropolisesDatas({});
    setRefresh(refresh + 1);
  };

  return (
    <>
      <header>
        <button type="button" onClick={handleRefresh}>
          Refresh Data
        </button>
        <section>
          Tri :
          <select name="tri" id="tri" onChange={handleChangeTri}>
            <option id="defaut" value="defaut">
              Defaut
            </option>
            <option id="nomVille" value="nomVille">
              Nom de la ville
            </option>
          </select>
        </section>
        {Object.keys(metropolisesDatas).length !== 0 && (
          <header>
            {Object.keys(metropolisesDatas).map((cityKey) => (
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
            ))}
          </header>
        )}
        {/* Ajout de l’affichage du message de chargement */}
        {isLoading === true && (
          <p>Données en cours de chargement... veuillez patienter</p>
        )}
        {/* Ajout de l’affichage du message d’erreur si il y en a eu une */}
        {error !== null && <p>{error}</p>}
      </header>
    </>
  );
}
