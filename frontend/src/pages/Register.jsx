import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

function Register() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
    first_name: "",
    last_name: "",
    role: "estudiante", // valor por defecto
    document: "",
    phone: "",
    date_of_birth: "",
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      await api.post("/usuarios/register/", formData);
      setSuccess(true);
      setTimeout(() => {
        navigate("/"); // redirige al login después de 2 segundos
      }, 2000);
    } catch (err) {
      setError(
        err.response?.data?.detail ||
        "Error al registrar el usuario. Revisa los datos."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
      <div className="w-full max-w-2xl">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 shadow-lg rounded-lg border border-gray-200"
        >
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-4 shadow-md">
              <span className="text-3xl text-white">📝</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Crear Cuenta
            </h1>
            <p className="text-gray-500 text-sm">
              Completa el formulario para registrarte
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-r-lg">
              <p className="text-red-700 text-sm font-medium flex items-center">
                <span className="mr-2">⚠️</span>
                {error}
              </p>
            </div>
          )}

          {/* Success Message */}
          {success && (
            <div className="mb-6 p-4 bg-green-50 border-l-4 border-green-500 rounded-r-lg">
              <p className="text-green-700 text-sm font-medium flex items-center">
                <span className="mr-2">✅</span>
                ¡Registro exitoso! Redirigiendo al login...
              </p>
            </div>
          )}

          {/* Form Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Username */}
            <div>
              <label htmlFor="username" className="block text-sm font-semibold text-gray-700 mb-2">
                Usuario <span className="text-red-500">*</span>
              </label>
              <input
                id="username"
                type="text"
                name="username"
                placeholder="Nombre de usuario"
                value={formData.username}
                onChange={handleChange}
                disabled={isLoading || success}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none disabled:bg-gray-100 disabled:cursor-not-allowed"
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                Correo Electrónico <span className="text-red-500">*</span>
              </label>
              <input
                id="email"
                type="email"
                name="email"
                placeholder="correo@ejemplo.com"
                value={formData.email}
                onChange={handleChange}
                disabled={isLoading || success}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none disabled:bg-gray-100 disabled:cursor-not-allowed"
              />
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
                Contraseña <span className="text-red-500">*</span>
              </label>
              <input
                id="password"
                type="password"
                name="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                disabled={isLoading || success}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none disabled:bg-gray-100 disabled:cursor-not-allowed"
              />
            </div>

            {/* Role */}
            <div>
              <label htmlFor="role" className="block text-sm font-semibold text-gray-700 mb-2">
                Rol <span className="text-red-500">*</span>
              </label>
              <select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                disabled={isLoading || success}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none disabled:bg-gray-100 disabled:cursor-not-allowed"
              >
                <option value="estudiante">👨‍🎓 Estudiante</option>
                <option value="profesor">👨‍🏫 Profesor</option>
                <option value="directivo">👔 Directivo</option>
                <option value="acudiente">👨‍👩‍👧 Acudiente</option>
              </select>
            </div>

            {/* First Name */}
            <div>
              <label htmlFor="first_name" className="block text-sm font-semibold text-gray-700 mb-2">
                Nombre
              </label>
              <input
                id="first_name"
                type="text"
                name="first_name"
                placeholder="Tu nombre"
                value={formData.first_name}
                onChange={handleChange}
                disabled={isLoading || success}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none disabled:bg-gray-100 disabled:cursor-not-allowed"
              />
            </div>

            {/* Last Name */}
            <div>
              <label htmlFor="last_name" className="block text-sm font-semibold text-gray-700 mb-2">
                Apellido
              </label>
              <input
                id="last_name"
                type="text"
                name="last_name"
                placeholder="Tu apellido"
                value={formData.last_name}
                onChange={handleChange}
                disabled={isLoading || success}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none disabled:bg-gray-100 disabled:cursor-not-allowed"
              />
            </div>

            {/* Document */}
            <div>
              <label htmlFor="document" className="block text-sm font-semibold text-gray-700 mb-2">
                Documento
              </label>
              <input
                id="document"
                type="text"
                name="document"
                placeholder="Número de documento"
                value={formData.document}
                onChange={handleChange}
                disabled={isLoading || success}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none disabled:bg-gray-100 disabled:cursor-not-allowed"
              />
            </div>

            {/* Phone */}
            <div>
              <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                Teléfono
              </label>
              <input
                id="phone"
                type="text"
                name="phone"
                placeholder="Número de teléfono"
                value={formData.phone}
                onChange={handleChange}
                disabled={isLoading || success}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none disabled:bg-gray-100 disabled:cursor-not-allowed"
              />
            </div>

            {/* Date of Birth */}
            <div className="md:col-span-2">
              <label htmlFor="date_of_birth" className="block text-sm font-semibold text-gray-700 mb-2">
                Fecha de Nacimiento
              </label>
              <input
                id="date_of_birth"
                type="date"
                name="date_of_birth"
                value={formData.date_of_birth}
                onChange={handleChange}
                disabled={isLoading || success}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none disabled:bg-gray-100 disabled:cursor-not-allowed"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading || success}
            className="mt-8 w-full bg-blue-600 text-white py-3 rounded-lg font-semibold shadow-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Registrando...
              </span>
            ) : success ? (
              "✅ Registro Exitoso"
            ) : (
              "Crear Cuenta"
            )}
          </button>

          {/* Login Link */}
          <div className="mt-6 text-center">
            <p className="text-gray-600 text-sm">
              ¿Ya tienes cuenta?{" "}
              <span
                onClick={() => !isLoading && !success && navigate("/")}
                className="text-blue-600 font-semibold cursor-pointer hover:text-blue-700 hover:underline transition-colors"
              >
                Inicia sesión aquí
              </span>
            </p>
          </div>
        </form>

        {/* Footer */}
        <p className="text-center text-gray-500 text-xs mt-6">
          © 2025 - Sistema de Innovación
        </p>
      </div>
    </div>
  );
}

export default Register;
