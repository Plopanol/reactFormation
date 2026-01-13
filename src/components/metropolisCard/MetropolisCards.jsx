import { useState, useEffect } from "react";
import MetropolisCard from "./MetropolisCard";

export default function MetropolisCards() {
  const [metropolisesDatas, setMetropolisesDatas] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [consoMax, setConsoMax] = useState("");
  const [refresh, setRefresh] = useState(0);

  const [tri, setTri] = useState("defaut");

  const handleChangeTri = (event) => {
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
        const listNomsVilles = Object.keys(datas).sort();
        let datasFiltrerEtTrie = {};

        // Tri
        if ("nomVille" === tri) {
          listNomsVilles.forEach((nomVille) => {
            datasFiltrerEtTrie[nomVille] = datas[nomVille];
          });
        } else {
          datasFiltrerEtTrie = datas;
        }

        // Filtre
        if (consoMax != "") {
          const filteredMetropolisesDatas = {};
          listNomsVilles.forEach((nomVille) => {
            if (
              datasFiltrerEtTrie[nomVille].datas["2025-01-01"]["12:00"]
                .consommation <= consoMax
            ) {
              filteredMetropolisesDatas[nomVille] =
                datasFiltrerEtTrie[nomVille];
            }
          });
          setMetropolisesDatas(filteredMetropolisesDatas);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDatas();
  }, [refresh, tri, consoMax]);

  const handleRefresh = () => {
    setMetropolisesDatas({});
    setRefresh(refresh + 1);
  };

  const handleSelectionConsoMax = (event) => {
    setConsoMax(event.target.value);
  };

  return (
    <>
      <header>
        <button type="button" onClick={handleRefresh}>
          Refresh Data
        </button>
        <section>
          Tri :
          <select onChange={handleChangeTri}>
            <option value="defaut">Defaut</option>
            <option value="nomVille">Nom de la ville</option>
          </select>
        </section>
        <input
          type="number"
          placeholder="Consommation max"
          value={consoMax}
          onChange={handleSelectionConsoMax}
        />
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
