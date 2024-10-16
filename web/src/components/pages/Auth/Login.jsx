import React, { useState } from 'react';
import { Eye, EyeOff, Mail } from 'lucide-react';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="min-h-screen bg-[#220447] text-white flex justify-center items-center font-['Inter']">
      <div className="w-full max-w-md p-6">
        <h2 className="text-3xl font-bold mb-12 text-center">Bienvenido de vuelta!</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-12">
            <label htmlFor="email" className="block mb-2 text-sm">
              Correo electrónico
            </label>
            <div className="relative">
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#3A0453] rounded-full px-4 py-2 pr-10 text-sm"
                placeholder="correo@example.com"
                required
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-[#C93DEC]" />
              </div>
            </div>
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block mb-2 text-sm">
              Contraseña
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#3A0453] rounded-full px-4 py-2 text-sm pr-10"
                required
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                aria-label="Toggle password visibility"
              >
                {showPassword ? (
                  <Eye className="h-5 w-5 text-[#C93DEC]" />
                ) : (
                  <EyeOff className="h-5 w-5 text-[#C93DEC]" />
                )}
              </button>
            </div>
          </div>
          <div className="mb-12 text-right">
            <a href="#" className="text-sm text-[#C93DEC] hover:underline">
              ¿Olvidaste tu contraseña?
            </a>
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-[#C93DEC] text-white rounded-lg py-2 px-8 font-bold hover:bg-opacity-90 transition-colors"
            >
              Continuar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;