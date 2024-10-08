import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  return (
      <div className="flex-grow flex justify-center items-center">
        <div className="bg-[#3A0453] p-8 rounded-lg w-96">
          <h2 className="text-2xl font-bold mb-6 text-center">Bienvenido de vuelta!</h2>
          <form>
            <div className="mb-4">
              <label htmlFor="email" className="block mb-2 text-sm font-bold">
                Correo electrónico
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#220447] rounded px-3 py-2 text-sm"
                placeholder="correo@example.com"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block mb-2 text-sm font-bold">
                Contraseña
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-[#220447] rounded px-3 py-2 text-sm pr-10"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
            </div>
            <div className="mb-6 text-right">
              <a href="#" className="text-sm text-[#C93DEC]">
                ¿Olvidaste tu contraseña?
              </a>
            </div>
            <button
              type="submit"
              className="w-full bg-[#C93DEC] text-white rounded-full py-2 font-bold"
            >
              Continuar
            </button>
          </form>
        </div>
      </div>
  );
};

export default Login;
