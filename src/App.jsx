import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import InfoPanel from "./components/infoPanel/InfoPanel";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <InfoPanel />
    </>
  );
}

export default App;
