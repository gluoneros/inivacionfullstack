import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import RegisterForm from './components/RegisterForm';
import LoginForm from './components/LoginForm';
import Dashboard from './components/Dashboard';

// Componente para rutas protegidas
const PrivateRoute = () => {
  const token = localStorage.getItem('token');
  return token ? <Outlet /> : <Navigate to="/login" />;
};

// Componente para rutas de invitados
const GuestRoute = () => {
  const token = localStorage.getItem('token');
  return !token ? <Outlet /> : <Navigate to="/dashboard" />;
};

function App() {
  return (
    <Routes>
      {/* Rutas de invitados (sin autenticación) */}
      <Route element={<GuestRoute />}>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/" element={<Navigate to="/login" replace />} />
      </Route>

      {/* Rutas protegidas (requieren autenticación) */}
      <Route element={<PrivateRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />
      </Route>

      {/* Ruta por defecto */}
      <Route path="*" element={
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">404 - Página no encontrada</h1>
            <p className="mb-4">La página que estás buscando no existe.</p>
            <a 
              href="/" 
              className="text-blue-600 hover:underline"
            >
              Volver al inicio
            </a>
          </div>
        </div>
      } />
    </Routes>
  );
}

export default App;