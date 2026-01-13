import { Link, Route, Routes } from "react-router-dom";
import "./App.css";
import Dashboard from "./pages/Dashboard";
import About from "./pages/About";

function App() {
  return (
    <>
      <Dashboard />
      <Link to="/about">A propos</Link>
      <br />
      <Link to="/">Dashboard</Link>
      <br />
      <Link to="/metropolis">Statistiques des villes</Link>
    </>
  );
}

export default App;
