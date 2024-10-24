import React, { useState } from 'react';
import { Eye, EyeOff, Mail } from 'lucide-react';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('http://localhost:8000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();

      if (response.ok) {
        // Store the JWT token in localStorage
        localStorage.setItem('token', result.accessToken);
        // Log the accessToken to the console
      console.log('Access Token:', result.accessToken);
        // Redirect to the home page
        window.location.href = '/';
      } else {
        setError(result.message);
      }
    } catch (error) {
      console.error('Error during login:', error);
      setError('An error occurred during login. Please try again.');
    }
  };

  return (
    <div className="min-h-6 bg-[#220447] text-white flex justify-center items-center font-['Inter']">
      <div className="w-full max-w-md p-6">
        <h2 className="text-2xl font-bold mt-3 mb-14 text-center">Bienvenido de vuelta!</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-12">
            <label htmlFor="email" className="block mb-2 text-sm font-medium">
              Correo electrónico
            </label>
            <div className="relative">
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#3A0453] text-[#B1AEAE] rounded-full px-4 py-2 pr-10 text-sm"
                required
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-[#C93DEC]" />
              </div>
            </div>
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block mb-2 text-sm font-medium">
              Contraseña
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#3A0453] text-[#B1AEAE] rounded-full px-4 py-2 text-sm pr-10"
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
          {error && (
            <div className="mb-6 text-red-500 text-sm">
              {error}
            </div>
          )}
          <div className="mb-12 text-right">
            <a href="/resetPass" className="text-sm text-[#C93DEC] hover:underline">
              ¿Olvidaste tu contraseña?
            </a>
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-[#C93DEC] text-white rounded-2xl py-2 px-6 hover:bg-[#a331c4] font-medium"
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