import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/navbar";
import Index from "./pages/Index";
import Login from "./pages/Login";
// import SobreNosotros from "./pages/SobreNosotros";
// import Modulos from "./pages/Modulos";
// import Opiniones from "./pages/Opiniones";
// import Perfil from "./pages/Perfil";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const auth = localStorage.getItem("isAuthenticated") === "true";
    const user = localStorage.getItem("username") || "";
    setIsAuthenticated(auth);
    setUsername(user);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("username");
    setIsAuthenticated(false);
    setUsername("");
  };

  const AppLayout = ({ children }) => {
    const location = useLocation();
    const isLoginPage = location.pathname === "/login";

    return (
      <>
        {!isLoginPage && (
          <Navbar
            isAuthenticated={isAuthenticated}
            username={username}
            onLogout={handleLogout}
          />
        )}
        {children}
      </>
    );
  };

  return (
    <Router>
      <AppLayout>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/sobre-nosotros" element={<div>Sobre Nosotros</div>} />
          <Route path="/modulos" element={<div>Módulos</div>} />
          <Route path="/opiniones" element={<div>Opiniones</div>} />
          {isAuthenticated && <Route path="/perfil" element={<div>Perfil</div>} />}
        </Routes>
      </AppLayout>
    </Router>
  );
};

export default App;
