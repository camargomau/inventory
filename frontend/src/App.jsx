import { useState } from "react";
import { TokenContext } from "./context/TokenContext";
import LandingPage from "./pages/LandingPage";
import Dashboard from "./pages/Dashboard";
import NewDashboard from "./pages/NewDashboard";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));

  // Show dashboard if authenticated, otherwise show landing page
  return (
    <TokenContext.Provider value={{ token, setToken }}>
      {token ? (
        <NewDashboard />
      ) : (
        <LandingPage />
      )}
    </TokenContext.Provider>
  );
}

export default App;
