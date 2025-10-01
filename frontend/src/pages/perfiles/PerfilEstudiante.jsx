import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";

function PerfilEstudiante() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    api.get("/usuarios/me/")
      .then((res) => {
        if (res.data.role !== "estudiante") {
          navigate(`/perfil/${res.data.role}`);
        } else {
          setUser(res.data);
        }
      })
      .catch(() => navigate("/"));
  }, [navigate]);

  if (!user) return <div>Cargando...</div>;

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold">Panel Estudiante</h1>
      <p>Hola {user.username}, aquí verás tus notas y progreso académico.</p>
    </div>
  );
}

export default PerfilEstudiante;
