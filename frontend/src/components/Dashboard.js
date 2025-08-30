import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = localStorage.getItem('token');
      
      if (!token) {
        navigate('/login');
        return;
      }

      try {
        const response = await axios.get('http://localhost:8000/api/usuarios/profile/', {
          headers: {
            'Authorization': `Token ${token}`,
            'Content-Type': 'application/json',
          },
        });
        
        setUser(response.data);
      } catch (err) {
        console.error('Error al cargar el perfil:', err);
        setError('No se pudo cargar la información del usuario');
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      </div>
    );
  }

  // Función para obtener el saludo según el rol
  const getGreeting = (role, name) => {
    const greetings = {
      'admin': `Hola Administrador ${name}`,
      'teacher': `Hola Profesor(a) ${name}`,
      'student': `Hola Estudiante ${name}`,
      'acudiente': `Hola Acudiente ${name}`
    };
    
    return greetings[role.toLowerCase()] || `Hola ${name}`;
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <h1 className="text-xl font-bold text-gray-900">Sistema Escolar</h1>
              </div>
            </div>
            <div className="flex items-center">
              <button
                onClick={handleLogout}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Cerrar sesión
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="py-10">
        <main>
          <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div className="px-4 py-8 sm:px-0">
              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    {user ? getGreeting(user.role, user.first_name) : 'Bienvenido'}
                  </h2>
                  <div className="mt-4">
                    <h3 className="text-lg font-medium text-gray-900">Información de la cuenta</h3>
                    {user && (
                      <div className="mt-2 grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div>
                          <p className="text-sm font-medium text-gray-500">Nombre completo</p>
                          <p className="text-sm text-gray-900">{`${user.first_name} ${user.last_name || ''}`}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-500">Correo electrónico</p>
                          <p className="text-sm text-gray-900">{user.email}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-500">Rol</p>
                          <p className="text-sm text-gray-900 capitalize">{user.role}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
