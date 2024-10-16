import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

const SignUp = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    correo: '',
    contrasena: '',
    fechaNacimiento: '',
    tipoUsuario: 'Cliente'
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="min-h-screen bg-[#220447] text-white font-['Inter']">
      <main className="flex justify-center items-center mt-8">
        <form onSubmit={handleSubmit} className="w-full max-w-4xl">
          <h2 className="text-2xl font-bold mt-2 mb-14 text-center">Complete los siguientes datos:</h2>
          
          <div className="flex justify-between">
            <div className="w-1/2 pr-8">
              <div className="mb-4 flex space-x-4">
                <div className="w-1/2">
                  <label htmlFor="nombre" className="block mb-2">Nombre</label>
                  <input
                    type="text"
                    id="nombre"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    className="w-full bg-[#3A0453] rounded-full px-4 py-2"
                    placeholder="Example"
                  />
                </div>
                <div className="w-1/2">
                  <label htmlFor="apellido" className="block mb-2">Apellido</label>
                  <input
                    type="text"
                    id="apellido"
                    name="apellido"
                    value={formData.apellido}
                    onChange={handleChange}
                    className="w-full bg-[#3A0453] rounded-full px-4 py-2"
                    placeholder="Example"
                  />
                </div>
              </div>
              <div className="mb-4">
                <label htmlFor="contrasena" className="block mb-2">Contraseña</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="contrasena"
                    name="contrasena"
                    value={formData.contrasena}
                    onChange={handleChange}
                    className="w-full bg-[#3A0453] rounded-full px-4 py-2 pr-10"
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#C93DEC]"
                  >
                    {showPassword ? (
                      <Eye className="h-5 w-5" />
                    ) : (
                      <EyeOff className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>
              <div className="mb-4">
                <label htmlFor="tipoUsuario" className="block mb-2">Tipo de usuario</label>
                <select
                  id="tipoUsuario"
                  name="tipoUsuario"
                  value={formData.tipoUsuario}
                  onChange={handleChange}
                  className="w-full bg-[#3A0453] rounded-full px-4 py-2 appearance-none"
                >
                  <option value="Cliente">Cliente</option>
                  <option value="Developer">Developer</option>
                </select>
              </div>
            </div>
            
            <div className="w-1/2 pl-8 flex flex-col justify-between">
              <div>
                <div className="mb-4">
                  <label htmlFor="correo" className="block mb-2">Correo electrónico</label>
                  <input
                    type="email"
                    id="correo"
                    name="correo"
                    value={formData.correo}
                    onChange={handleChange}
                    className="w-full bg-[#3A0453] rounded-full px-4 py-2"
                    placeholder="correo@example.com"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="fechaNacimiento" className="block mb-2">Fecha de nacimiento</label>
                  <input
                    type="date"
                    id="fechaNacimiento"
                    name="fechaNacimiento"
                    value={formData.fechaNacimiento}
                    onChange={handleChange}
                    className="w-full bg-[#3A0453] rounded-full px-4 py-2 appearance-none text-[#C93DEC] [&::-webkit-calendar-picker-indicator]:filter [&::-webkit-calendar-picker-indicator]:invert [&::-webkit-calendar-picker-indicator]:sepia [&::-webkit-calendar-picker-indicator]:saturate-[10000%] [&::-webkit-calendar-picker-indicator]:hue-rotate-[275deg]"
                  />
                </div>
              </div>
              <div className="flex justify-end mt-8">
                <button
                  type="submit"
                  className="bg-[#C93DEC] text-white rounded-lg py-2 px-8 font-bold"
                >
                  Continuar
                </button>
              </div>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
};

export default SignUp;