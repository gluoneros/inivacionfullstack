import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PerfilDirectivo from "./pages/perfiles/PerfilDirectivo";
import PerfilProfesor from "./pages/perfiles/PerfilProfesor";
import PerfilEstudiante from "./pages/perfiles/PerfilEstudiante";
import PerfilAcudiente from "./pages/perfiles/PerfilAcudiente";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/perfil/directivo" element={<PerfilDirectivo />} />
        <Route path="/perfil/profesor" element={<PerfilProfesor />} />
        <Route path="/perfil/estudiante" element={<PerfilEstudiante />} />
        <Route path="/perfil/acudiente" element={<PerfilAcudiente />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
