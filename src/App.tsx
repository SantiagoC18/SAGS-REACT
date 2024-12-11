import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './styles/inicio2.css';
import './styles/estilos.css';
import Nav from './assets/components/Nav';
import Home from './assets/components/Home';
import Planes from './assets/components/Planes';
import SobreNosotros from './assets/components/sobre_nosotros';
import Modulos from './assets/components/modulos';
import Foro from './assets/components/opiniones';
import Perfil from './assets/components/perfi';


function App() {
  return (

    <div>
      <Router>
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sobre_nosotros" element={<SobreNosotros />} />
          <Route path="/gestion-de-proyectos" element={<Modulos />} />
          <Route path="/opiniones" element={<Foro />} />
          <Route path="/perfil" element={<Perfil />} />
        </Routes>
      </Router>     
      <Planes />
    </div>
  );
}

export default App;