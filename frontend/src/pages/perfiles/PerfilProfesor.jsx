import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";

function PerfilProfesor() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    api.get("/usuarios/me/")
      .then((res) => {
        if (res.data.role !== "profesor") {
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
      <h1 className="text-2xl font-bold">Panel Profesor</h1>
      <p>Bienvenido {user.username}, aquí podrás gestionar calificaciones y cursos.</p>
    </div>
  );
}

export default PerfilProfesor;
