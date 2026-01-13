import { Route, Routes } from "react-router-dom";
import MetropolisCards from "../components/metropolisCard/MetropolisCards";
import InfoPanel from "../components/infoPanel/InfoPanel";

export default function Dashboard() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <InfoPanel totalCities="200" avgConsumption="950" period="24" />
        }
      />
      <Route path="/metropolis" element={<MetropolisCards />} />
    </Routes>
  );
}
