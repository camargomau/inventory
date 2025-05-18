import { useState } from "react";
import LandingPage from "./pages/LandingPage";
import Dashboard from "./pages/Dashboard";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));

  // Show dashboard if authenticated, otherwise show landing page
  return token ? (
    <Dashboard token={token} setToken={setToken} />
  ) : (
    <LandingPage setToken={setToken} />
  );
}

export default App;
