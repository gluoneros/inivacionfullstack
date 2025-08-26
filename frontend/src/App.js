// En /frontend/src/App.js
import { Routes, Route } from 'react-router-dom';
import RegisterForm from './components/RegisterForm';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-2xl font-bold mb-4">Prueba de Rutas</h1>
      <Routes>
        <Route path="/register" element={<RegisterForm />} />
        <Route path="*" element={<p>Ruta no encontrada. Intenta con <a href="/register" className="text-blue-600">/register</a></p>} />
      </Routes>
    </div>
  );
}

export default App;